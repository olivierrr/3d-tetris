precision mediump float;

attribute vec3 aPosition;
attribute vec3 aNormal;

varying vec3 vNormal;
varying vec3 vFragPosition;

uniform mat4 uProjection;
uniform mat4 uModel;
uniform mat4 uView;

void main() {
  vNormal = aNormal;

  vec4 pos = vec4(uView * uModel * vec4(aPosition, 1.0));
  gl_Position = uProjection * pos;
  vFragPosition = pos.xyz;
}
