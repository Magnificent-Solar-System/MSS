class Ship {
    constructor(model, technique, texture, position, mass, scale, cameraOffset) {
        this.transform = new Transform(position, Quaternion.Identity(), scale);
        this.model = model;
        this.technique = technique;
        this.cameraOffset = cameraOffset;
        this.body = new Body(this.transform, mass);
        this.viewMatrix = new mat4();
        this.texture = texture;
    }
  
    draw(viewProjectionMatrix) {
        //gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertexBuffer);
        
        //gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
        
        this.technique.Use();
        this.technique.SetTexture(this.texture);
        this.technique.SetMatrixWorld(this.transform.matrix);
        this.technique.SetMatrixRotation(this.transform.mat_rotation);
        this.technique.SetMatrixViewProjection(viewProjectionMatrix);
        this.technique.SetupAttributes();
        gl.drawArrays(gl.TRIANGLES, 0, this.model.vertexCount);
        
        //gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
        
        this.technique.DisableAttributes();
    }
    
    update(deltaTime) {
        this.body.update(deltaTime);
        this.transform.updateMatrix();
        
        let campos = vec3.add(this.transform.position, this.transform.mat_rotation.transformDirection(this.cameraOffset));
        
        mat4.LookAt(this.viewMatrix, 
                    campos,
                    vec3.add(campos, this.transform.forward), 
                    this.transform.up);
    }  
}
