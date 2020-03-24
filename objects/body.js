class Body {
    constructor(transform, mass) {
        this.transform = transform;
        this.mass = mass;
        this.onebymass = 1.0 / mass;
        this.velocity = new vec3(0, 0, 0);
        this.force = new vec3(0, 0, 0);
    }
    
    applyImpulse(p) {
        this.velocity = vec3.add(this.velocity, vec3.mulvs(p, this.onebymass));
    }
    
    applyForce(f) {
        this.force.x += f.x;
        this.force.y += f.y;
        this.force.z += f.z;
    }
    
    update(deltaTime) {
        this.velocity = vec3.add(this.velocity, vec3.mulvs(this.force, deltaTime * this.onebymass));
        this.force.x = 0;
        this.force.y = 0;
        this.force.z = 0;
        this.transform.position = vec3.add(this.transform.position, vec3.mulvs(this.velocity, deltaTime));
    }
}