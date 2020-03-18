class TechniqueEarth extends Technique {
    constructor() {
        super();
        super.LoadShaders("earth", "TechniqueEarth");
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationMatrix = super.GetUniformLocation("uMatrix");
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
    SetAdditionalMatrices(planet) {
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, planet.mat_world.m);
        gl.uniformMatrix4fv(this.locationRotationMatrix, false, planet.mat_rotation.m);
    }
    SetMatrix(matrix) {
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
    }
    Use() {
        super.Use();
        gl.uniform3f(this.locationSunPosition, SUN.position.x, SUN.position.y, SUN.position.z);
    }
    
}