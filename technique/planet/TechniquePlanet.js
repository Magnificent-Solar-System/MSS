class TechniquePlanet extends Technique {
    constructor() {
        super();
        super.AddShader(gl.FRAGMENT_SHADER, tchPlanet_frag);
        super.AddShader(gl.VERTEX_SHADER, tchPlanet_vert);
        super.Link();
        this.locationMatrix = super.GetUniformLocation("uMatrix");
        this.locationSunPosition = super.GetUniformLocation("uSunPosition");
        
        super.InitializeAttributes(
            ["vPosition", 3, gl.FLOAT ],
            ["vTexCoords", 2, gl.FLOAT ],
            ["vNormal", 3, gl.FLOAT ]
        );
    }
    Use(matrix, sunPosition) {
        super.Use();
        gl.uniformMatrix4fv(this.locationMatrix, false, matrix.m);
        gl.uniform3f(this.locationSunPosition, sunPosition.x, sunPosition.y, sunPosition.z);
    }
}