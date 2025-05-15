---
name: ww-skeleton-loader
description: A customizable skeleton loader component with various animation styles for indicating loading states
keywords: skeleton, loader, loading, animation, pulse, wave, shimmer, placeholder
---

#### Skeleton Loader

Properties:
- `animationType`: `'wave' | 'pulse' | 'shimmer'` - Type of animation to apply. Default: `'wave'`
  - `pulse`: Fades in and out
  - `wave`: Shows a moving highlight from left to right
  - `shimmer`: Creates a left-to-right shine effect

NOTE:
It is highly recommended to style the component with the following styles in order for the visual to be good :
- width/height
- borderRadius
- backgroundColor

Exemple :
<elements>
{"uid":0,"tag":"ww-skeleton-loader","props":{"default":{"animationType":"wave"}},"styles":{"default":{"height":"100px","backgroundColor":"#E0E0E0","borderRadius":"15px"}}}
</elements>
