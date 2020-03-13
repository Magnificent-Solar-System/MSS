var tchEarth_frag = `
precision mediump float;

uniform sampler2D uSamplerDay;
uniform sampler2D uSamplerNight;

in vec2 fTexCoords;
in float fLight;

out vec4 fragColor;

void main(){
    vec4 dayColor = texture(uSamplerDay, fTexCoords);
    vec4 nightColor = texture(uSamplerNight, fTexCoords);
    fragColor = mix(nightColor, dayColor, fLight);
}
`