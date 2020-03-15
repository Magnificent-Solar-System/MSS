precision mediump float;

uniform sampler2D uSampler;

in vec2 fTexCoords;

out vec4 fragColor;

void main(){
    vec3 cl = texture(uSampler, fTexCoords).rgb;
    vec3 mapped = cl / (cl + vec3(1.0));
    fragColor = vec4(mapped, 1.0);
}