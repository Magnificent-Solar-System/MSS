var tchPostProcessing_frag = `
precision mediump float;

uniform sampler2D uSampler;

in vec2 fTexCoords;

out vec4 fragColor;

void main(){
    vec4 cl = texture(uSampler, fTexCoords);
    fragColor = cl;
}
`