import { PARAMETERS } from "./parameters";

export const VERTEX_SHADER = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;
 
export const FRAGMENT_SHADER = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

uniform float zoom;

uniform float offset_x;
uniform float offset_y;
 
// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {

    float dx = (gl_FragCoord.x - ${PARAMETERS.width / 2}.0) / zoom + offset_x;
    float dy = (gl_FragCoord.y - ${PARAMETERS.height / 2}.0) / zoom + offset_y;

    float a = dx;
    float b = dy;

    for(float i = 0.0; i < 2000.0; i++) {
        float d = (a * a) - (b * b) + dx;
        b = 2.0 * (a * b) + dy;
        a = d;
        if (d > 10000.0) {
            outColor = vec4(i * 1.3, i * 0.9, i * 0.3, 1);
            break;
        }
    }
}
`;