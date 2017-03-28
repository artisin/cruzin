# Cruzin

__Description__: A modern MVC-less Webpack build tool for cruz'in. In the future, I plan on writing up some documentation and possibly a video walkthrough. In short, cruzin has it all from automatic offline support service worker configuration to every loader you could reasonably want in a build tool to compress images, handle fonts, wireup the HTML, and much more. Additionally, it’s highly configurable and centralized around YAML config files. The Webpack rc-config is located in the root `.cruzinrc.yml`, and the HTML configuration for pug is located in `src/pug/config.yml`.

__Commands__

+ Install: `yarn install`
+ Development: `yarn run dev`
+ Build/Production: `yarn run build`

__Tech__

+ HTML - Pug
+ Javascript - Bable
+ CSS - Stylus + ctr
+ [intercooler.js](intercoolerjs.org) - for MVC-like actions
