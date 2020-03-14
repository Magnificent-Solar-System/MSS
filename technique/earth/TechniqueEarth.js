class TechniqueEarth extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchEarth_frag);
        super.AddShader(gl.VERTEX_SHADER, tchEarth_vert);
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationViewProjectionMatrix = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.locationSamplerDay = super.GetUniformLocation("uSamplerDay");
        this.locationSamplerNight = super.GetUniformLocation("uSamplerNight");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    Use(worldmatrix,viewProjectionMatrix, sunPosition, textureDay, textureNight) {
        super.Use();
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, worldmatrix.m);
        gl.uniformMatrix4fv(this.locationViewProjectionMatrix, false,viewProjectionMatrix.m);
        gl.uniform3f(this.locationSunPosition, sunPosition.x, sunPosition.y, sunPosition.z);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureDay);
        gl.uniform1i(this.locationSamplerDay, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textureNight);
        gl.uniform1i(this.locationSamplerNight, 1);
    }
    
}