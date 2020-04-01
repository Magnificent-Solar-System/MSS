uniform vec3 uUp;
uniform vec3 uCamera;
uniform mat4 uViewProjectionMatrix;

in vec2 vVertex;
in vec3 vPosition;
in vec3 vColor;
in vec2 vSize;

out vec3 fColor;

void main()
{
    fColor = vColor;
    vec3 right = cross(uUp, normalize(vPosition - uCamera));
    gl_Position = uViewProjectionMatrix * vec4(vPosition + vSize.x * right * vVertex.x + vSize.y * uUp * vVertex.y, 1.0);
}   