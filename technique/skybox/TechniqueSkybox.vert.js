var tchSkybox_vert = `
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;

in vec3 vPosition;

out vec3 fTexCoords;

void main()
{
    fTexCoords = vPosition;
    gl_Position = uProjectionMatrix * uViewMatrix * vec4(vPosition, 1.0);
}  
`