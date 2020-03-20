class Ship {
  constructor(model, technique, cameraOffset, mass, position) {
    this.position = position;
    this.model = model;
    this.technique = technique;
    this.velocity = new vec3(0.0, 0.0, 0.0);
    this.mass = mass;
    this.viewMatrix = new mat4();
    this.quat = Quaternion.Identity();
    this.cameraOffset = cameraOffset;
  }
  
  rotate(yaw, pitch, roll) {
        let deltaQuat = Quaternion.FromYawPitchRoll(yaw, pitch, roll);
        this.quat = Quaternion.Multiply(this.quat, deltaQuat);
        
        this.xAxis = this.quat.transform(vec3.unitX());
        this.yAxis = this.quat.transform(vec3.unitY());
        this.zAxis = this.quat.transform(vec3.inv(vec3.unitZ()));
  }
  
  draw() {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertexBuffer);
    this.technique.Use();
    this.technique.SetupAttributes();
    gl.drawArrays(gl.TRIANGLES, this.model.vertexCount);
    this.technique.DisableAttributes();
  }
  
  update(deltaTime) {
    this.position = vec3.add(this.position, vec3.mulvs(this.velocity, deltaTime));
    
    let camoffset = this.quat.transform(this.cameraOffset);
    mat4.LookAt(this.viewMatrix, vec3.add(this.position, camoffset), this.position, this.yAxis);
  }
  
  
}
