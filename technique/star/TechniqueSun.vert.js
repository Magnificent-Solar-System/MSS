var tchSun_vert = `
uniform mat4 uMatrix;

in vec3 vPosition;
in vec2 vTexCoords;
//in vec3 vNormal;

out vec2 fTexCoords;

void main() {
    fTexCoords = vTexCoords;
    gl_Position = uMatrix * vec4(vPosition, 1.0);
}
`