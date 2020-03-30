uniform mat4 uWorldMatrix;
uniform mat4 uViewProjectionMatrix;

in vec3 vPosition;
in vec2 vTexCoords;

out vec2 fTexCoords;

void main() {
    fTexCoords = vTexCoords;
    gl_Position = uViewProjectionMatrix * uWorldMatrix * vec4(vPosition, 1.0);
}