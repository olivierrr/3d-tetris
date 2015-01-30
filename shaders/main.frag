precision mediump float;

varying vec3 vNormal;
varying vec3 vFragPosition;

uniform vec3 uColor;

const vec3 LIGHTPOS = vec3(0.0, 10.0, 5.0);
const float SHININESS = 1.1;
const float AMBIENT = 0.1;

void main() {
  vec3 eyeDirection = normalize(vFragPosition);
  vec3 normal = normalize(vNormal);
  vec3 light = normalize(LIGHTPOS);

  float lambert = dot(normal, light);
  float phong = pow(max(dot(reflect(light, normal), eyeDirection), 0.0), SHININESS);

  gl_FragColor = vec4(lambert * uColor + phong * vec3(0.2, 1.0, 0.1) + AMBIENT, 1.0);
}
