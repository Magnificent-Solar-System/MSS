class Transform {
    constructor(position, quaternion, scale){
        this.position = position;
        this.quaternion = quaternion === undefined ? Quaternion.Identity() : quaternion;
        this.scale = scale === undefined ? new vec3(1, 1, 1) : scale;
        
        this.forward = vec3.unitNZ();
        this.right = vec3.unitX();
        this.up = vec3.unitY();
        
        this.matrix = new mat4();
        this.mat_scale = new mat4();
        this.mat_rotation = new mat4();
        this.mat_translation = new mat4();
    }
    
    rotate(yaw, pitch, roll) {
        let dquat = Quaternion.FromYawPitchRoll(yaw, pitch, roll);
        this.quaternion = Quaternion.Multiply(this.quaternion, dquat);
        
        this.right = this.quaternion.transform(vec3.unitX());
        this.up = this.quaternion.transform(vec3.unitY());
        this.forward = this.quaternion.transform(vec3.unitNZ());
    }
    
    updateMatrix() {
        mat4.Scale(this.mat_scale, this.scale);
        mat4.Translation(this.mat_translation, this.position);
        this.quaternion.toMatrix(this.mat_rotation);
        
        mat4.World(this.matrix, this.mat_scale, this.mat_translation, this.mat_rotation);
    }
}