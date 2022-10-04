export let PARAMETERS: IParameters = {
    height: 700,
    width: 1000,
    zoom: 200,
    dragx: 0,
    dragy: 0
}

export interface IParameters {
    width: number;
    height: number;
    zoom: number;
    dragx: number;
    dragy: number;
}