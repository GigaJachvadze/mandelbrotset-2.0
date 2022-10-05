import { CanvasClass } from "./canvas";
import { PARAMETERS } from "./parameters";

export class Main {
  canvasElement: HTMLCanvasElement = document.querySelector('canvas');

  draggableElement: HTMLElement = document.getElementById('draggable');

  canvas: CanvasClass = new CanvasClass(this.canvasElement, PARAMETERS);

  dragging: boolean = false;

  zoomMultiplier = 1;

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
    this.setUpSliders();
  }

  setUpDraggable(): void {
    this.draggableElement.style.width = PARAMETERS.width + 'px';
    this.draggableElement.style.height = PARAMETERS.height + 'px';
    this.draggableElement.style.left = this.canvasElement.offsetLeft + 'px';
  }

  setUpSliders(): void {
    let r = document.getElementById('r');
    let g = document.getElementById('g');
    let b = document.getElementById('b');
    let a = document.getElementById('a');

    r.addEventListener('input', event => {
      PARAMETERS.color.r = r.value;
      this.canvas.deepDraw();
    })
    g.addEventListener('input', event => {
      PARAMETERS.color.g = g.value;
      this.canvas.deepDraw();
    })
    b.addEventListener('input', event => {
      PARAMETERS.color.b = b.value;
      this.canvas.deepDraw();
    })
    a.addEventListener('input', event => {
      PARAMETERS.color.a = a.value;
      this.canvas.deepDraw();
    })
  }

  onZoomChange(event: any): void {
    if (event.wheelDelta < 0) {
      PARAMETERS.zoom -= 1 * (this.zoomMultiplier * this.zoomMultiplier * this.zoomMultiplier);
      this.zoomMultiplier--;
    } else {
      PARAMETERS.zoom += 1 * (this.zoomMultiplier * this.zoomMultiplier * this.zoomMultiplier);
      this.zoomMultiplier++;
    }
    let location = this.canvas.getUniformLocation('zoom');
    this.canvas.assignUniform(location, PARAMETERS.zoom);
    this.canvas.draw();
    console.log(this.zoomMultiplier);
  }

  async onDrag(event: any) {
    await this.sleep(50);
    PARAMETERS.dragx += -event.movementX / (500 * PARAMETERS.zoom / 500);
    PARAMETERS.dragy += event.movementY / (500 * PARAMETERS.zoom / 500);
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