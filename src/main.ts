import { CanvasClass } from "./canvas";
import { PARAMETERS } from "./parameters";

export class Main {
  canvasElement: HTMLCanvasElement = document.querySelector('canvas');

  draggableElement: HTMLElement = document.getElementById('draggable');

  canvas: CanvasClass = new CanvasClass(this.canvasElement, PARAMETERS);

  dragging: boolean = false;

  constructor() {
    this.onInit();
  }

   onInit(): void {
    window.addEventListener('wheel', event => this.onZoomChange(event));
    this.setUpDraggable();
    this.draggableElement.addEventListener('mousedown', event => {
        this.dragging = true;
    });
    this.draggableElement.addEventListener('mousemove', event => {
      if (this.dragging == true) {
        this.onDrag(event);
      }
    })
    this.draggableElement.addEventListener('mouseup', event => {
        this.dragging = false;
    })
  }

  setUpDraggable(): void {
    this.draggableElement.style.width = PARAMETERS.width + 'px';
    this.draggableElement.style.height = PARAMETERS.height + 'px';
    this.draggableElement.style.left = this.canvasElement.offsetLeft + 'px';
  }

  onZoomChange(event: any): void {
    PARAMETERS.zoom += event.wheelDelta;
    let location = this.canvas.getUniformLocation('zoom');
    this.canvas.assignUniform(location, PARAMETERS.zoom);
    this.canvas.draw();
  }

  onDrag(event: any): void {
    PARAMETERS.dragx += -event.movementX / (500 * PARAMETERS.zoom / 1);
    PARAMETERS.dragy += event.movementY / (500 * PARAMETERS.zoom / 1);
    let locationx = this.canvas.getUniformLocation('offset_x');
    let locationy = this.canvas.getUniformLocation('offset_y');
    this.canvas.assignUniform(locationx, PARAMETERS.dragx);
    this.canvas.assignUniform(locationy, PARAMETERS.dragy);
    this.canvas.draw();
  }
  
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}

new Main();