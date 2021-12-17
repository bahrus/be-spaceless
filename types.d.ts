import {BeDecoratedProps} from 'be-decorated/types';

export interface BeSpacelessVirtualProps{

}

export interface BeSpacelessProps extends BeSpacelessVirtualProps{
    proxy: Element & BeSpacelessVirtualProps;
}

export interface BeSpacelessActions{
    intro(proxy: Element & BeSpacelessVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeSpacelessVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
}