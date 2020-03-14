class TechniqueStar extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchStar_frag);
        super.AddShader(gl.VERTEX_SHADER, tchStar_vert);
        super.Link();
        this.locationMatrix = super.GetUniformLocation("uMatrix");
        this.locationLightColor = super.GetUniformLocation("uLightColor");
        this.uSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    Use(matrix, lightColor ) {
        super.Use();
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
        gl.uniform4f(this.locationLightColor, lightColor.x, lightColor.y, lightColor.z, lightColor.w);
        gl.uniform1i(this.uSampler, 0);
    }
}