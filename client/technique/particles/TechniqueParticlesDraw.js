class TechniqueParticlesDraw extends Technique {
    constructor() {
        super();
        super.LoadShaders("particles", "TechniqueParticlesDraw");
        super.Link();
        this.locationMatrixViewProjection = super.GetUniformLocation("uViewProjectionMatrix");
        this.locationUp = super.GetUniformLocation("uUp");
        this.locationCamera = super.GetUniformLocation("uCamera");
        
        this.locationVertex = super.GetAttribLocation("vVertex");
        this.locationPosition = super.GetAttribLocation("vPosition");
        this.locationColor = super.GetAttribLocation("vColor");
        this.locationSize = super.GetAttribLocation("vSize");

        this.stride = particlesParticleBytes;
    }
    SetCameraParameters(campos, camup) {
        gl.uniform3f(this.locationCamera, campos.x, campos.y, campos.z);
        gl.uniform3f(this.locationUp, camup.x, camup.y, camup.z);
    }
    SetViewProjectionMatrix(viewProjection) {
        gl.uniformMatrix4fv(this.locationMatrixViewProjection, false, viewProjection.m);
    }
    SetupAttributesGeneral() {
        gl.enableVertexAttribArray(this.locationVertex); 
        gl.vertexAttribPointer(this.locationVertex, 2, gl.FLOAT, false, 0, 0);
    }
    SetupAttributesIndividual() {
        gl.enableVertexAttribArray(this.locationPosition); 
        gl.vertexAttribPointer(this.locationPosition, 3, gl.FLOAT, false, this.stride, 0);
        gl.vertexAttribDivisor(this.locationPosition, 1);
        gl.enableVertexAttribArray(this.locationColor); 
        gl.vertexAttribPointer(this.locationColor, 3, gl.FLOAT, false, this.stride, 36);
        gl.vertexAttribDivisor(this.locationColor, 1);
        gl.enableVertexAttribArray(this.locationSize); 
        gl.vertexAttribPointer(this.locationSize, 2, gl.FLOAT, false, this.stride, 60);
        gl.vertexAttribDivisor(this.locationSize, 1);
    }
    DisableAttributes() {
        gl.disableVertexAttribArray(this.locationVertex); 
        gl.disableVertexAttribArray(this.locationPosition); 
        gl.disableVertexAttribArray(this.locationColor); 
        gl.disableVertexAttribArray(this.locationSize); 
    }
}