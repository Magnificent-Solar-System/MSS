const Transform = require(global.dirname + '/objects/transform.js');
const Body = require(global.dirname + '/objects/body.js');
const vec3 = require(global.dirname + '/math/vec3.js');
const Quaternion = require(global.dirname + '/math/quaternion.js');

class Ship {
    constructor(id, position) {
        this.id = id;
        this.transform = new Transform(position, Quaternion.Identity(), global.SHIP_SCALE);
        this.body = new Body(this.transform, global.SHIP_MASS);
    }
    
    update(deltaTime) {
        this.body.update(deltaTime);
    }  
}

module.exports = Ship;