class Camera {
    constructor(pos, yaw, pitch, roll) {
        this.position = pos;
        this.viewMatrix = new mat4();
        this.quat = Quaternion.Identity();
        this.rotate(yaw, pitch, roll);
    }
    rotate(yaw, pitch, roll) {
        let deltaQuat = Quaternion.FromYawPitchRoll(yaw, pitch, roll);
        this.quat = Quaternion.Multiply(this.quat, deltaQuat);
        
        this.xAxis = this.quat.transform(vec3.unitX());
        this.yAxis = this.quat.transform(vec3.unitY());
        this.zAxis = this.quat.transform(vec3.inv(vec3.unitZ()));
        
        mat4.LookAt(this.viewMatrix, this.position, vec3.add(this.position, this.zAxis), this.yAxis);
    }
    
}