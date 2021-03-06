class TechniqueSkysphere extends Technique {
    constructor() {
        super();
        super.LoadShaders("skysphere", "TechniqueSkysphere");
        super.Link();
        
        this.locationSampler = super.GetUniformLocation("uSampler");
        this.locationProjectionMatrix = super.GetUniformLocation("uProjectionMatrix");
        this.locationViewMatrix = super.GetUniformLocation("uViewMatrix");
        
        this.viewMatrixNotTranslated = new mat4();
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ]
        );
    }
    SetTexture(texture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.uniform1i(this.locationSampler, 0);
    }
    Use(viewMatrix, projectionMatrix) {
        super.Use();
        gl.uniformMatrix4fv(this.locationProjectionMatrix, false, projectionMatrix.m);
        this.viewMatrixNotTranslated.copy(viewMatrix);
        this.viewMatrixNotTranslated.translation = vec3.zero();
        gl.uniformMatrix4fv(this.locationViewMatrix, false, this.viewMatrixNotTranslated.m);
    }
}