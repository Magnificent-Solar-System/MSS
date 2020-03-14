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
            ["vTexCoords", 2, gl.FLOAT ]
        );
        this.stride += 3 * 4;
    }
    SetTextures(texture0) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(this.uSampler, 0);
    }
    SetMatrix(matrix) {
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
    }
    Use() {
        super.Use();
        gl.uniform4f(this.locationLightIntensity, SUN.lightIntensity.x, SUN.lightIntensity.y, SUN.lightIntensity.z, SUN.lightIntensity.w);
    }
}