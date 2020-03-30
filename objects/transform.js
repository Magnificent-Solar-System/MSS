const vec3 = require(global.dirname + '/math/vec3.js');
const Quaternion = require(global.dirname + '/math/Quaternion.js');

class Transform {
    constructor(position, quaternion, scale){
        this.position = position;
        this.quaternion = quaternion === undefined ? Quaternion.Identity() : quaternion;
        this.scale = scale === undefined ? new vec3(1, 1, 1) : scale;
        
        this.forward = vec3.unitNZ();
        this.right = vec3.unitX();
        this.up = vec3.unitY();
    }
    
    rotate(yaw, pitch, roll) {
        let dquat = Quaternion.FromYawPitchRoll(yaw, pitch, roll);
        this.quaternion = Quaternion.Multiply(this.quaternion, dquat);
        
        this.right = this.quaternion.transform(vec3.unitX());
        this.up = this.quaternion.transform(vec3.unitY());
        this.forward = this.quaternion.transform(vec3.unitNZ());
    }
}

module.exports = Transform;