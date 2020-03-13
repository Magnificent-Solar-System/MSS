var tchPostProcessing_frag = `
precision mediump float;

uniform sampler2D uSampler;

in vec2 fTexCoords;

out vec4 fragColor;

void main(){
    vec4 cl = texture(uSampler, fTexCoords);
    if(cl.r > 1.0) cl.b = cl.r - 1.0; //hdr test
    fragColor = cl;
}
`