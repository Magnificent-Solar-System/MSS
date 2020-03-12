var tchPostProcessing_vert = `

in vec2 vPosition;

out vec2 fTexCoords;

const vec2 cHalf = vec2(0.5, 0.5);

void main() {
    fTexCoords = vPosition * cHalf + cHalf;
    gl_Position = vec4(vPosition, 0.0, 1.0);
}
`