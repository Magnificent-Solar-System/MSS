precision mediump float;

uniform sampler2D uSampler;

in vec2 fTexCoords;
in float fLight;

out vec4 fragColor;

void main(){
    //fragColor = vec4(fLight * vec3(fTexCoords * 0.0, 1.0), 1.0); //w/o texture, for test
    fragColor = texture(uSampler, fTexCoords) * fLight; //with texture
}