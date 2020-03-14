class Camera {
    constructor(pos, yaw, pitch, roll) {
        this.position = pos;
        this.viewMatrix = new mat4();
        this.yaw = (yaw === undefined) ? 0.0 : yaw;
        this.pitch = (pitch === undefined) ? 0.0 : pitch;
        this.roll = (roll === undefined) ? 0.0 : roll;
        this.update();
    }
    update() {
        let quat = Quaternion.FromYawPitchRoll(this.yaw, this.pitch, this.roll);
        
        this.xAxis = quat.transform(vec3.unitX());
        this.yAxis = quat.transform(vec3.unitY());
        this.zAxis = quat.transform(vec3.unitZ());
        
        mat4.LookAt(this.viewMatrix, this.position, vec3.add(this.position, this.zAxis), this.yAxis);
    }
    
}