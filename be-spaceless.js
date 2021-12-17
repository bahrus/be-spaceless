import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeSpacelessController {
    #target;
    #targetObserver;
    intro(proxy, target, beDecorProps) {
        this.#target = target;
        this.#targetObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                console.log(entry);
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
