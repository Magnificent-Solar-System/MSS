class TechniquePlanet extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchPlanet_frag);
        super.AddShader(gl.VERTEX_SHADER, tchPlanet_vert);
        super.Link();
        this.locationWorldMatrix = super.GetUniformLocation("uWorldMatrix");
        this.locationViewProjectionMatrix = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        this.uSampler = super.GetUniformLocation("uSampler");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    Use(matrixVP, sunPosition ) {
        super.Use();
        gl.uniformMatrix4fv(this.locationViewProjectionMatrix, false, matrixVP.m);
        gl.uniform3f(this.locationSunPosition, sunPosition.x, sunPosition.y, sunPosition.z);
        gl.uniform1i(this.uSampler , 0);
    }
    SetWorldMatrix(matrixWorld) {
        gl.uniformMatrix4fv(this.locationWorldMatrix, false, matrixWorld.m);
    }
}