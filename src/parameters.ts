export let PARAMETERS: IParameters = {
    height: 752,
    width: 1536,
    zoom: 200,
    dragx: 0,
    dragy: 0,
    color: <IColor>{
        r: 255,
        g: 255,
        b: 255,
        a: 255
    },
    maxIteration: 500
}

export interface IParameters {
    width: number;
    height: number;
    zoom: number;
    dragx: number;
    dragy: number;
    color: IColor;
    maxIteration: number;
}

export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}