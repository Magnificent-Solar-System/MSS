class Planet {
    constructor(pos, vel, mass, radius) {
        this.sphere = createSphere(planetParallels, planetMeridians, radius);
        this.radius = radius;
        this.mass = mass;
        this.velocity = vel;
        this.position = pos;
    }
    bindArrayBuffer() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.vertexBuffer);
    }
    draw() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphere.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.sphere.elementCount, gl.UNSIGNED_SHORT, 0);
    }
}