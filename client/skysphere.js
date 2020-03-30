var Skysphere = {};
Skysphere.Initialize = function () {
    Skysphere.technique = new TechniqueSkysphere();
    Skysphere.Cube = geom.CuboidIndexed(new vec3(1, 1, 1), true);
}
Skysphere.Draw = function (viewMatrix, projectionMatrix) {
    gl.depthMask(false);
    Skysphere.technique.Use(viewMatrix, projectionMatrix);
    Skysphere.technique.SetTexture(Skysphere.texture);
    gl.bindBuffer(gl.ARRAY_BUFFER, Skysphere.Cube.vertexBuffer);
    Skysphere.technique.SetupAttributes();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Skysphere.Cube.indexBuffer);
    gl.drawElements(gl.TRIANGLES, Skysphere.Cube.elementCount, gl.UNSIGNED_SHORT, 0);
    Skysphere.technique.DisableAttributes();
    gl.depthMask(true);
}