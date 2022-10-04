import { IParameters } from "./parameters";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shaders";

export class CanvasClass {

    private width: number;
    private height: number;
    
    public zoom: number = 200;

    private canvas: HTMLCanvasElement;

    private gl: WebGL2RenderingContext | null = null;

    private vertexShader: WebGLShader;
    private fragmentShader: WebGLShader;
    private program: WebGLProgram;


    constructor(canvas: HTMLCanvasElement, paramiters: IParameters) {
        this.canvas = canvas;
        this.width = paramiters.width;
        this.height = paramiters.height;
        this.onInit();
    }

    private onInit(): void {
        this.gl = this.canvas.getContext('webgl2');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        while (!this.checkCompatibility(this.gl)) {
            window.alert('webgl not avaliable!');
        }
        this.main();
    }

    private main(): void {
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, VERTEX_SHADER);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

        this.program = this.createProgram(this.vertexShader, this.fragmentShader);

        let positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');

        let buffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

        let positions = this.generatePixels();

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        let zoomAttributeUniform = this.getUniformLocation('zoom');

        // Create a vertex array object (attribute state)
        let vao = this.gl.createVertexArray();

        // and make it the one we're currently working with
        this.gl.bindVertexArray(vao);

        // Turn on the attribute
        this.gl.enableVertexAttribArray(positionAttribute);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 2;          // 2 components per iteration
        let type = this.gl.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        this.gl.vertexAttribPointer(positionAttribute, size, type, normalize, stride, offset);

        // Tell WebGL how to convert from clip space to pixels
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        // Clear the canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        this.gl.useProgram(this.program);

        this.assignUniform(zoomAttributeUniform, this.zoom);

        // Bind the attribute/buffer set we want.
        this.gl.bindVertexArray(vao);

        this.draw();
    }

    private checkCompatibility(gl: WebGL2RenderingContext | null): boolean {
        if (gl) return true;
        return false;
    }

    private createShader(type: number, source: string): WebGLShader | null {
        let shader = this.gl!.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        let results = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (results) return shader;
        console.log(this.gl.getShaderInfoLog(shader));
        return null;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
        let program = this.gl!.createProgram();
        this.gl.attachShader(program, vertexShader)
        this.gl.attachShader(program, fragmentShader)
        this.gl.linkProgram(program);
        let results = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (results) return program;
        console.log(results);
        return null;
    }

    private generatePixels(): Array<number> {
        let returnVal = [];
        for (let x = -(this.width / 2); x < this.width / 2; x++) {
            for (let y = -(this.height / 2); y < this.height / 2; y++) {

            }
        }

        returnVal.push(-1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1);

        return returnVal;
    }

    public draw(): void {
        // draw
        let primitiveType = this.gl.TRIANGLES;
        let offsetf = 0;
        let count = 6;
        this.gl.drawArrays(primitiveType, offsetf, count);
    }

    public getUniformLocation(name: string): WebGLUniformLocation {
        return this.gl.getUniformLocation(this.program, name);
    }

    public assignUniform(uniformPos: any, value: any): void {
        this.gl.uniform1f(uniformPos, value);
    }
}