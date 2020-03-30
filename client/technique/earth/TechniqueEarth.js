class TechniqueEarth extends Technique {
    constructor() {
        super();
        super.LoadShaders("earth", "TechniqueEarth");
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationViewProjectionMatrix = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationRotationMatrix = super.GetUniformLocation("uRotationMatrix"); 
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.locationSamplerDay = super.GetUniformLocation("uSamplerDay");
        this.locationSamplerNight = super.GetUniformLocation("uSamplerNight");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    SetTextures(texture0, texture1) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(this.locationSamplerDay, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.uniform1i(this.locationSamplerNight, 1);
    }
    SetWorldMatrix(worldMatrix) {
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, worldMatrix.m);
    }
    SetRotationMatrix(rotationMatrix) {
        gl.uniformMatrix4fv(this.locationRotationMatrix, false, rotationMatrix.m);
    }
    SetViewProjectionMatrix(viewProjectionMatrix) {
        gl.uniformMatrix4fv(this.locationViewProjectionMatrix, false, viewProjectionMatrix.m);
    }
    Use(sunpos) {
        super.Use();
        gl.uniform3f(this.locationSunPosition, sunpos.x, sunpos.y, sunpos.z);
    }
    
}