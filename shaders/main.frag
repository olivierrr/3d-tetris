precision mediump float;

varying vec3 vNormal;

uniform vec3 uColor;
uniform vec4 uCamera;

const vec3 DIFFUSE = vec3(0.6, 0.4, 0.6); 
const vec3 LIGHTDIRECTION = vec3(-0.8, 1.0, 0.5);

void main() {
  float brightness = dot(vNormal, LIGHTDIRECTION);

  gl_FragColor = vec4(uColor + DIFFUSE.rbg * brightness, 1.0);
}
