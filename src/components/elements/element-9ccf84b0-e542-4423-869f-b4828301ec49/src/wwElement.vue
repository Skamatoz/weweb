<template>
    <div class="element-container" :style="cssVariables" :class="{ editing: isEditing, selected: isSelected }">
        <div ref="swiper" :key="componentKey" class="swiper" ww-responsive="swiper">
            <wwLayout
                :disable-drag-drop="true"
                path="mainLayoutContent"
                class="swiper-wrapper"
                ww-responsive="swiper-wrapper"
            >
                <template #default="{ item, index }">
                    <wwLayoutItem v-if="item !== undefined" class="swiper-slide" ww-responsive="swiper-slide">
                        <wwElement
                            class="slide-container"
                            v-bind="item"
                            :states="index !== sliderIndex ? ['Not Current Slide'] : []"
                        />
                    </wwLayoutItem>
                </template>
            </wwLayout>
        </div>

        <div v-show="content.pagination" class="bullets">
            <div
                v-for="index in numberOfBullets"
                :key="index"
                class="bullet-container"
                @click="onBulletClick(index - 1)"
            >
                <wwLocalContext
                    :data="{ currentBulletIndex: index, isCurrent: index - 1 === sliderIndex }"
                    elementKey="bullet"
                >
                    <wwElement
                        class="bulletIcon"
                        v-bind="content.bulletsIcons"
                        :states="index - 1 === sliderIndex ? ['active', 'Current Slide'] : []"
                    />
                </wwLocalContext>
            </div>
        </div>

        <div v-show="showLeftNav" class="navigation-container prev" @click="slidePrev">
            <wwElement class="layout-prev" v-bind="content.navigationIcons[0]" />
        </div>
        <div v-show="showRightNav" class="navigation-container next" @click="slideNext">
            <wwElement class="layout-next" v-bind="content.navigationIcons[1]" />
        </div>

    </div>
</template>

<script>
import { nextTick, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

import Swiper, { EffectFlip, EffectFade, EffectCoverflow, EffectCube, EffectCards, Autoplay, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cube';

import { getContent } from './getContent.js';

export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
    },
    emits: ['update:content', 'update:sidepanel-content'],
    setup(props, { emit }) {

        const swiper = ref(null);
        const swiperInstance = ref(null);
        const sliderIndex = ref(0);
        const componentKey = ref(0);
        const isInit = ref(false);

        const isEditing = computed(() => {
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const isSelected = computed(() => {
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const nbOfSlides = computed(() => {
            const content = getContent(props.content.mainLayoutContent);
            return content.length;
        });

        const slidesPerView = computed(() => {
            let slidePerView = props.content.slidesPerView;
            if (typeof slidePerView === 'string') {
                slidePerView = parseInt(slidePerView);
            }
            if (!slidePerView || isNaN(slidePerView)) {
                slidePerView = 1;
            }

            if (slidePerView > nbOfSlides.value) {
                return nbOfSlides.value;
            } else if (slidePerView < 1) {
                return 1;
            } else {
                return slidePerView;
            }
        });

        const showLeftNav = computed(() => {
            const hasPrevious = sliderIndex.value > 0 || props.content.loop;
            return props.content.navigation && hasPrevious;
        });

        const showRightNav = computed(() => {
            const hasNext = sliderIndex.value + slidesPerView.value - 1 < nbOfSlides.value - 1 || props.content.loop;
            return props.content.navigation && hasNext;
        });

        const numberOfBullets = computed(() => {
            return Math.ceil(nbOfSlides.value - slidesPerView.value + 1);
        });

        const transitionDuration = computed(() => {
            let value = props.content.transitionDuration || '0s';
            value = value.substring(0, value.length - 2);
            return parseInt(value);
        });

        const automaticTiming = computed(() => {
            let value = props.content.automaticTiming;
            value = value.substring(0, value.length - 1);
            return parseInt(value);
        });

        const swiperOptions = computed(() => {
            const autoplay = {
                autoplay: {
                    delay: automaticTiming.value * 1000,
                    disableOnInteraction: false,
                },
            };

            const mousewheel = {
                mousewheel: {
                    forceToAxis: props.content.mousewheelForceToAxis,
                    invert: props.content.mousewheelInvert,
                    sensitivity: props.content.mousewheelSensitivity || 1,
                },
            };

            const options = {
                modules: [EffectFlip, EffectFade, EffectCoverflow, EffectCube, EffectCards, Autoplay, Mousewheel],
                effect: props.content.effect,
                cardsEffect: { slideShadows: false },
                coverflowEffect: { slideShadows: false },
                slidesPerView: slidesPerView.value,
                speed: transitionDuration.value,
                spaceBetween: parseInt(props.content.spaceBetween ? props.content.spaceBetween.slice(0, -2) : '0'),
                loop: props.content.loop,
                freeMode: props.content.linearTransition,
                allowTouchMove: !isEditing.value,
                touchStartPreventDefault: false,

                on: {
                    realIndexChange: e => {
                        sliderIndex.value = e.realIndex;
                    },
                },
            };

            return {
                ...options,
                ...(props.content.automatic ? autoplay : {}),
                ...(props.content.mousewheel ? mousewheel : {}),
            };
        });

        const cssVariables = computed(() => {
            return {
                '--timing-function': props.content.linearTransition ? 'linear' : 'auto',
            };
        });

        const currentScreenSize = computed(() => {
            return wwLib.globalContext.browser.breakpoint;
        });

        const slideTo = index => {
            /* slideToLoop instead of slideTo allows to always rely on the realIndex,
            and thus to keep the right index even when the loop mode is activated */
            if (swiperInstance.value) swiperInstance.value.slideToLoop(index, transitionDuration.value);
        };

        const onBulletClick = index => {
            if (isEditing.value) return;
            slideTo(index);
        };

        const slideNext = () => {
            if (isEditing.value) return;
            if (swiperInstance.value) swiperInstance.value.slideNext(transitionDuration.value);
        };

        const slidePrev = () => {
            if (isEditing.value) return;
            if (swiperInstance.value) swiperInstance.value.slidePrev(transitionDuration.value);
        };

        const handleAutoplay = () => {
            if (
                isEditing.value &&
                props.content.automatic &&
                swiperInstance.value &&
                swiperInstance.value.autoplay &&
                swiperInstance.value.autoplay.running
            ) {
                swiperInstance.value.autoplay.stop();
            } else if (
                !isEditing.value &&
                props.content.automatic &&
                swiperInstance.value &&
                swiperInstance.value.autoplay &&
                swiperInstance.value.autoplay.running
            ) {
                swiperInstance.value.autoplay.start();
            }
        };

        const initSwiper = async (resetIndex = false) => {
            // Prevents multiple initializations that can lead to autoplay or loop bugs
            if (isInit.value) return;
            isInit.value = true;
            try {
                if (swiperInstance.value && swiperInstance.value.destroy) swiperInstance.value.destroy(true, true);

                // Necessary to clean the possible persistent style in the element before a new initialization
                componentKey.value += 1;

                // Necessary to make the loop mode work properly with wwElements
                await nextTick();
                await nextTick();

                swiperInstance.value = new Swiper(swiper.value, swiperOptions.value);
                sliderIndex.value = swiperInstance.value.realIndex;

                if (resetIndex) slideTo(0);

                // Ensures that autoplay does not continue when editing
                handleAutoplay();
            } catch (error) {
                wwLib.wwLog.warn('WW-SLIDER SWIPER INIT ERROR', error);
            } finally {
                isInit.value = false;
            }
        };



        watch(
            () => props.content.mainLayoutContent,
            () => {
                initSwiper(true);
            }
        );

        watch(
            () => currentScreenSize.value,
            () => {
                initSwiper();
            }
        );

        onMounted(() => {
            initSwiper(false);
        });

        onBeforeUnmount(() => {
            if (swiperInstance.value) swiperInstance.value.destroy(true, true);
        });

        wwLib.wwElement.useRegisterElementLocalContext(
            'slider',
            {
                // Put all data / computed in there
                sliderIndex,
                nbOfSlides,
                slidesPerView,
                showLeftNav,
                showRightNav,
                numberOfBullets,
            },
            {
                slideTo: {
                    method: slideTo,
                    editor: {
                        label: 'Slide to',
                        elementName: 'Slider',
                        description: 'Slide to a specific slide index.',
                        args: [
                            {
                                name: 'Index',
                                type: 'number',
                            },
                        ],
                    },
                },
                slideNext: {
                    method: slideNext,
                    editor: {
                        label: 'Slide Next',
                        elementName: 'Slider',
                        description: 'Slide to the next slide.',
                    },
                },
                slidePrev: {
                    method: slidePrev,
                    editor: {
                        label: 'Slide Prev',
                        elementName: 'Slider',
                        description: 'Slide to the previous slide.',
                    },
                },
            }
        );

        return {
            swiper,
            sliderIndex,
            componentKey,
            isEditing,
            isSelected,
            showLeftNav,
            showRightNav,
            numberOfBullets,
            cssVariables,
            onBulletClick,
            slideNext,
            slidePrev,
            swiperInstance,
        };
    },
};
</script>

<style lang="scss" scoped>
.element-container {
    position: relative;

    .bullets {
        pointer-events: all;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        display: flex;
        flex-direction: row;
        .bullet-container {
            height: 20px;
        }
    }

}
.swiper {
    width: 100%;
    height: 100%;
}
.swiper-wrapper {
    position: relative;
    transition-timing-function: var(--timing-function);

    .slide-container {
        width: 100%;
    }
}

.swiper-slide {
    z-index: 1;
    position: relative;
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    max-width: 100%;
    .slide-layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
}

.navigation-container {
    width: 100px;
    position: absolute;
    top: 50%;

    transform: translateY(-50%);
    z-index: 2;

    &.prev {
        left: 0;
    }
    &.next {
        right: 0;
    }
}
</style>
