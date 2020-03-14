class TechniqueSun extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchSun_frag);
        super.AddShader(gl.VERTEX_SHADER, tchSun_vert);
        super.Link();
        this.locationMatrix = super.GetUniformLocation("uMatrix");
        this.locationLightIntensity = super.GetUniformLocation("uLightColor");
        this.uSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    Use(matrix) {
        super.Use();
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
        gl.uniform4f(this.locationLightIntensity, SUN.lightIntensity.x, SUN.lightIntensity.y, SUN.lightIntensity.z, SUN.lightIntensity.w);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, SUN.texture0);
        gl.uniform1i(this.uSampler, 0);
    }
}