precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColor;
uniform vec3 uCamera;
uniform mat4 uModel;

const vec3 LIGHTPOS = vec3(10.0, 10.0, 5.0);
const float SHININESS = 1.0;
const float AMBIENT = 0.1;

void main() {
  vec3 fragPos = vec3(uModel * vec4(vPosition, 1.0));

  vec3 surfaceToLight = normalize(LIGHTPOS - fragPos);
  vec3 surfaceToCamera = normalize(uCamera - fragPos);

  float diffuse = max(0.0, dot(vNormal, surfaceToLight));

  float specular = pow(max(0.0, dot(surfaceToCamera, reflect(-surfaceToLight, vNormal))), SHININESS);

  gl_FragColor = vec4((diffuse * uColor) + AMBIENT, 1.0);

  if(fragPos == LIGHTPOS) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
