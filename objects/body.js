class Body {
    constructor(pos, vel, mass, radius, genTexCoords, genNormales ,texture) {
        this.sphere = geomSphere(planetParallels, planetMeridians, radius, genTexCoords, genNormales);
        this.radius = radius;
        this.mass = mass;
        this.velocity = vel;
        this.position = pos;
        this.worldMatrix = new mat4();
        this.tex = texture;
    }
    bindArrayBuffer() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.vertexBuffer);
    }
 
    draw() {    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphere.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.sphere.elementCount, gl.UNSIGNED_SHORT, 0);
    }
}