class Ship {
  constructor(model, technique, position, scale) {
    this.transform = new Transform(position, Quaternion.Identity(), scale);
    this.model = model;
    this.technique = technique;
  }
  
  draw(viewProjectionMatrix) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertexBuffer);
    this.technique.Use();
    this.technique.SetMatrixWorld(this.transform.matrix);
    this.technique.SetMatrixRotation(this.transform.mat_rotation);
    this.technique.SetMatrixViewProjection(viewProjectionMatrix);
    this.technique.SetupAttributes();
    gl.drawArrays(gl.TRIANGLES, 0, this.model.vertexCount);
    this.technique.DisableAttributes();
  }
  
  update(deltaTime) {
      
  }  
}
