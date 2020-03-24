precision mediump float;

uniform sampler2D uSampler;

in vec2 fTexCoords;
in float fLight;

out vec4 fragColor;

void main(){
    fragColor = texture(uSampler, fTexCoords) * fLight;
}