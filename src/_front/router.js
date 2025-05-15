import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"8a4863b8-3f04-4be8-aae4-fc5351b44707","homePageId":"d7e4eade-593d-4953-afa2-8091d55eb814","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"pages":[{"id":"899528c6-9334-4831-9c72-e1a02a78f74d","linkId":"899528c6-9334-4831-9c72-e1a02a78f74d","name":"Auth!","folder":null,"paths":{"en":"auth","default":"auth"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"a4bb3ce8-40ef-47e9-a739-8d7bf8db68a4","sectionTitle":"Section","linkId":"90dddab1-8e25-4b2d-b029-1bd262aee014"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"c19e816c-af17-41b5-971c-910eb9fdfb09","linkId":"c19e816c-af17-41b5-971c-910eb9fdfb09","name":"Treaning","folder":null,"paths":{"en":"treaning","default":"treaning"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"cb436aff-34c0-4683-bd90-db7004663110","sectionTitle":"Section","linkId":"d363dbb6-8d8f-4352-a121-39c2ecb804fd"},{"uid":"c97954b4-96fa-48e6-8310-2724daebc5e1","sectionTitle":"Bottom Nav","linkId":"72978a08-bff4-4133-ab0f-d2335447728b"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"cf97896a-188d-470e-9d42-99099c9f3da8","linkId":"cf97896a-188d-470e-9d42-99099c9f3da8","name":" Zayrad","folder":null,"paths":{"en":"program1","default":"program1"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"be6374ce-34f2-47a6-85e4-c8dc826e234f","sectionTitle":"Section","linkId":"34ab21eb-7dfe-4558-9031-8bcd62317b95"},{"uid":"8ada7f94-ec3f-43cd-850e-7ddee406d09d","sectionTitle":"Bottom Nav","linkId":"f1d9b373-e75a-46f4-9779-85e313ece8a0"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"d7e4eade-593d-4953-afa2-8091d55eb814","linkId":"d7e4eade-593d-4953-afa2-8091d55eb814","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"750b09b2-7ff2-4fc7-bc7a-7b9755d8f938","sectionTitle":"Section","linkId":"e87eb578-f6fd-4509-a306-a1a14f7829fa"},{"uid":"ad1aacfa-c109-49ae-9453-2565606f05e7","sectionTitle":"Alert (Deprecated)","linkId":"1fa0c329-ae23-4fc5-be12-ab56b092fbfb"},{"uid":"448f4af7-4dd8-45df-a2ec-61833b6b5ce4","sectionTitle":"Bottom Nav","linkId":"fb73b9b5-f20e-4150-a898-142ce42714ff"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"1d08a59b-d388-4048-95da-6005533b26b5","linkId":"1d08a59b-d388-4048-95da-6005533b26b5","name":"Program 2","folder":null,"paths":{"en":"program2","default":"program2"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"bb91733f-1fcd-4961-8ee6-e19f7bc14176","sectionTitle":"Section","linkId":"658b9513-22fa-4608-8e9c-a05e7f4142aa"},{"uid":"be46a4df-ddca-4189-8f54-b9131132829d","sectionTitle":"Bottom Nav","linkId":"c3cbc177-31b6-4394-959d-03bc75a99eb6"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"3e1de743-4a7d-4fbb-a6ef-3a49a5ddec03","linkId":"3e1de743-4a7d-4fbb-a6ef-3a49a5ddec03","name":"rehab","folder":null,"paths":{"en":"rehab","default":"rehab"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"f26f7b9a-4e0f-4f4e-8aed-4425d5e563f1","sectionTitle":"Section","linkId":"27b4f986-06de-41f8-abb2-602399139722"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"deddfb9d-efdf-400a-b37b-37e8945b07df","linkId":"deddfb9d-efdf-400a-b37b-37e8945b07df","name":"telegram","folder":null,"paths":{"en":"telegram","default":"telegram"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"afa25bc9-d157-44ae-93c8-c00d27c22727","sectionTitle":"Section","linkId":"99fb81b3-7bbc-4b2c-8330-2b75783372fb"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"97e7b1ae-f88a-4697-849c-ee56ab49bb48","name":"JavaScript","namespace":"javascript"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"cd33cf33-e29f-4e8c-ac26-b997fe507ce7","name":"Xano","namespace":"xano"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 157;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(process.env.VUE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
