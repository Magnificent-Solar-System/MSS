class TechniqueDefault extends Technique {
    constructor() {
        super();
        super.LoadShaders("default", "TechniqueDefault");
        super.Link();
        this.locationMatrixWorld = super.GetUniformLocation("uWorldMatrix");
        this.locationMatrixViewProjection = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationMatrixRotation = super.GetUniformLocation("uRotationMatrix"); 
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.locationSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    SetTexture(texture0) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(this.locationSampler, 0);
    }
    SetMatrixWorld(world) {
        gl.uniformMatrix4fv(this.locationMatrixWorld, false, world.m);
    }
    SetMatrixRotation(rotation) {
        gl.uniformMatrix4fv(this.locationMatrixRotation, false, rotation.m);
    }
    SetMatrixViewProjection(viewProjection) {
        gl.uniformMatrix4fv(this.locationMatrixViewProjection, false, viewProjection.m);
    }
    Use() {
        super.Use();
        gl.uniform3f(this.locationSunPosition, SUN.position.x, SUN.position.y, SUN.position.z);
    }
}