import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeSpacelessController {
    #target;
    #targetObserver;
    intro(proxy, target, beDecorProps) {
        this.#target = target;
        target.style.transformOrigin = 'top left';
        target.style.position = 'absolute';
        this.#targetObserver = new ResizeObserver(entries => {
            for (const { contentRect, target } of entries) {
                const innerHeight = contentRect.height;
                const innerWidth = contentRect.width;
                const outerHeight = target.parentElement.clientHeight;
                const outerWidth = target.parentElement.clientWidth;
                //console.log({innerHeight, innerWidth, outerHeight, outerWidth});
                const zoom = Math.min(outerWidth / innerWidth, outerHeight / innerHeight);
                target.style.transform = `scale(${zoom})`;
                const leftOffset = (outerWidth - innerWidth * zoom) / 2;
                const topOffset = (outerHeight - innerHeight * zoom) / 2;
                console.log({ zoom, innerWidth, outerWidth, innerHeight, outerHeight, leftOffset, topOffset });
                target.style.left = `${leftOffset}px`;
                target.style.top = `${topOffset}px`;
            }
        });
        this.#targetObserver.observe(this.#target);
    }
    finale(proxy, target, beDecorProps) {
        this.#targetObserver.disconnect();
    }
}
const tagName = 'be-spaceless';
const ifWantsToBe = 'spaceless';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: [],
            intro: 'intro',
            finale: 'finale'
        },
    },
    complexPropDefaults: {
        controller: BeSpacelessController
    }
});
register(ifWantsToBe, upgrade, tagName);
