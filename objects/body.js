const vec3 = require(global.dirname + '/math/vec3.js');

class Body {
    constructor(transform, mass) {
        this.transform = transform;
        this.mass = mass;
        this.velocity = new vec3(0, 0, 0);
        
        this.onebymass = 1.0 / mass;
        this.dForce = new vec3(0, 0, 0);
        this.dImpulse = new vec3(0, 0, 0);
    }
    
    applyImpulse(p) {
        this.dImpulse.x += p.x;
        this.dImpulse.y += p.y;
        this.dImpulse.z += p.z;
    }
    
    applyForce(f) {
        this.dForce.x += f.x;
        this.dForce.y += f.y;
        this.dForce.z += f.z;
    }
    
    update(deltaTime) {
        let dtbym = deltaTime * this.onebymass;
        this.velocity.x += this.dForce.x * dtbym + this.dImpulse.x * this.onebymass;
        this.velocity.y += this.dForce.y * dtbym + this.dImpulse.y * this.onebymass;
        this.velocity.z += this.dForce.z * dtbym + this.dImpulse.z * this.onebymass;
        this.dImpulse.x = 0;
        this.dImpulse.y = 0;
        this.dImpulse.z = 0;
        this.dForce.x = 0;
        this.dForce.y = 0;
        this.dForce.z = 0;
        this.transform.position = vec3.add(this.transform.position, vec3.mulvs(this.velocity, deltaTime));
    }
}

module.exports = Body;