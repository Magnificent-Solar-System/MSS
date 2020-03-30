class TechniqueSun extends Technique {
    constructor() {
        super();
        super.LoadShaders("sun", "TechniqueSun");
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationViewProjectionMatrix = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationLightIntensity = super.GetUniformLocation("uLightColor");
        this.uSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ]
        );
        this.stride += 3 * 4;
    }
    SetTextures(texture0) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(this.uSampler, 0);
    }
    SetWorldMatrix(worldMatrix) {
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, worldMatrix.m);
    }
    SetRotationMatrix() { }
    SetViewProjectionMatrix(viewProjectionMatrix) {
        gl.uniformMatrix4fv(this.locationViewProjectionMatrix, false, viewProjectionMatrix.m);
    }
    Use() {
        super.Use();
        gl.uniform4f(this.locationLightIntensity, SUN.lightIntensity.x, SUN.lightIntensity.y, SUN.lightIntensity.z, SUN.lightIntensity.w);
    }
}