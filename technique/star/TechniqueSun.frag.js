var tchSun_frag = `
precision mediump float;

uniform vec4 uLightColor;
uniform sampler2D uSampler;

in vec2 fTexCoords;

out vec4 fragColor;

void main(){
    fragColor = texture(uSampler, fTexCoords) * uLightColor;
}
`