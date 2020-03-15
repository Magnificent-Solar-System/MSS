class TechniqueSkybox extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchSkybox_frag);
        super.AddShader(gl.VERTEX_SHADER, tchSkybox_vert);
        super.Link();
        
        this.locationSkybox = super.GetUniformLocation("uSkybox");
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
        gl.uniform1i(this.locationSkybox, 0);
    }
    Use(viewMatrix, projectionMatrix) {
        super.Use();
        gl.uniformMatrix4fv(this.locationProjectionMatrix, false, projectionMatrix.m);
        this.viewMatrixNotTranslated.copy(viewMatrix);
        this.viewMatrixNotTranslated.translation = vec3.zero();
        gl.uniformMatrix4fv(this.locationViewMatrix, false, this.viewMatrixNotTranslated.m);
    }
}