# Token summary

- Espresso: `#2A211D`; cream: `#FBF9F5`; sand: `#F7F3ED`; taupe: `#4A3B32`
- Status colors: pistachio `#DDE8C4`, terracotta `#E8A18B`
- Display type: Georgia serif; UI type: Arial sans-serif
- Layout: 1400px maximum width, thin espresso 12% borders, rounded pill controls, 44px background grid
- Motion: 0.35s card lift and 0.7s entrance reveal
- Breakpoint: 700px

# Raw source

```css
@import "tailwindcss";
@theme { --color-espresso:#2A211D;--color-cream:#FBF9F5;--color-sand:#F7F3ED;--color-taupe:#4A3B32;--color-pistachio:#DDE8C4;--color-terracotta:#E8A18B;--font-display:Georgia,serif;--font-sans:Arial,sans-serif; }
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--color-cream);color:var(--color-espresso);font-family:var(--font-sans)}::selection{background:#DDE8C4}.grid-bg{background-image:linear-gradient(#2A211D0b 1px,transparent 1px),linear-gradient(90deg,#2A211D0b 1px,transparent 1px);background-size:44px 44px}.line{border-color:#2A211D20}.reveal{animation:up .7s both}@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}.delay{animation-delay:.13s}.delay-2{animation-delay:.26s}.card{transition:transform .35s,background .35s}.card:hover{transform:translateY(-5px)}@media(max-width:700px){.desktop{display:none}}
```
