import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeSpacelessVirtualProps, BeSpacelessActions, BeSpacelessProps} from './types';

export class BeSpacelessController implements BeSpacelessActions{
    #target!: Element;
    #targetObserver!: ResizeObserver;
    intro(proxy: Element & BeSpacelessVirtualProps, target: HTMLElement, beDecorProps: BeDecoratedProps): void{
        this.#target = target;
        target.style.transformOrigin = 'top left';
        target.style.position = 'absolute';
        this.#targetObserver = new ResizeObserver(entries => {
            for(const {contentRect, target} of entries){
                const innerHeight = contentRect.height;
                const innerWidth = contentRect.width;
                const outerHeight = target.parentElement!.clientHeight;
                const outerWidth = target.parentElement!.clientWidth;
                //console.log({innerHeight, innerWidth, outerHeight, outerWidth});
                const zoom = Math.min(outerWidth / innerWidth, outerHeight / innerHeight);
                (target as HTMLElement).style.transform = `scale(${zoom})`;
            }
        });
        this.#targetObserver.observe(this.#target);
    }

    finale(proxy: Element & BeSpacelessVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void{
        this.#targetObserver.disconnect();
    }

}

export interface BeSpacelessController extends BeSpacelessProps{}

const tagName = 'be-spaceless';

const ifWantsToBe = 'spaceless';

const upgrade = '*';

define<BeSpacelessProps & BeDecoratedProps<BeSpacelessProps, BeSpacelessActions>, BeSpacelessActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: [],
            intro: 'intro',
            finale: 'finale'
        },
    },
    complexPropDefaults:{
        controller: BeSpacelessController
    }
});

register(ifWantsToBe, upgrade, tagName);