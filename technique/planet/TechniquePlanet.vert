uniform vec3 uSunPosition;
uniform mat4 uViewProjectionMatrix;
uniform mat4 uWorldMatrix;

in vec3 vPosition;
in vec2 vTexCoords;
in vec3 vNormal;

out float fLight;
out vec2 fTexCoords;

void main() {
    vec4 worldPositionC = uWorldMatrix * vec4(vPosition, 1.0);
    vec3 worldPosition = worldPositionC.xyz / worldPositionC.w;
    fLight = dot(vNormal, normalize(uSunPosition - worldPosition));
    fTexCoords = vTexCoords;
    gl_Position = uViewProjectionMatrix * worldPositionC;
}