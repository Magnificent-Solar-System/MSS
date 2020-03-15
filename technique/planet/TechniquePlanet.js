class TechniquePlanet extends Technique {
    constructor() {
        super();
        super.LoadShaders("/technique/planet/TechniquePlanet");
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationViewProjectionMatrix = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.locationSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    SetTextures(texture0) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(this.locationSampler, 0);
    }
    SetWorldMatrix(worldMatrix) {
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, worldMatrix.m);
    }
    SetViewProjectionMatrix(viewProjectionMatrix) {
        gl.uniformMatrix4fv(this.locationViewProjectionMatrix, false, viewProjectionMatrix.m);
    }
    Use() {
        super.Use();
        gl.uniform3f(this.locationSunPosition, SUN.position.x, SUN.position.y, SUN.position.z);
    }
}