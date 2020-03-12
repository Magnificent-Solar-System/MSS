class TechniquePlainColor extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchPlainColor_frag);
        super.AddShader(gl.VERTEX_SHADER, tchPlainColor_vert);
        super.Link();
        
        this.locationColor = this.GetUniformLocation("uColor");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ]
        );
    }
    Use(cl) {
        super.Use();
        gl.uniform4f(this.locationColor, cl.x, cl.y, cl.z, cl.w);
    }
}