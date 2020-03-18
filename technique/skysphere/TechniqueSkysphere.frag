precision mediump float;

uniform samplerCube uSampler;

in vec3 fTexCoords;

out vec4 FragColor;

void main()
{    
    FragColor = texture(uSampler, fTexCoords);
}