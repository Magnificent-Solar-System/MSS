class TechniquePostProcessing extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchPostProcessing_frag);
        super.AddShader(gl.VERTEX_SHADER, tchPostProcessing_vert);
        super.Link();
        this.locationSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 2, gl.FLOAT ]
        );
    }
    Use(texture) {
        super.Use();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.locationSampler, 0);
    }
}