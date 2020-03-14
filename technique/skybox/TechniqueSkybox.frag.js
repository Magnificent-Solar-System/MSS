var tchSkybox_frag = `
precision mediump float;

uniform samplerCube uSkybox;

in vec3 fTexCoords;

out vec4 FragColor;

void main()
{    
    FragColor = texture(uSkybox, fTexCoords);
}
`