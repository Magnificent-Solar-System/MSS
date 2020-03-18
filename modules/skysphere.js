var Skysphere = {};
Skysphere.Initialize = function () {
    Skysphere.Cube = geom.CuboidIndexed(new vec3(1, 1, 1), true);
}
Skysphere.Draw = function (viewMatrix, projectionMatrix) {
    gl.depthMask(false);
    tchSkysphere.Use(viewMatrix, projectionMatrix);
    tchSkysphere.SetTexture(Skysphere.texture);
    gl.bindBuffer(gl.ARRAY_BUFFER, Skysphere.Cube.vertexBuffer);
    tchSkysphere.SetupAttributes();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Skysphere.Cube.indexBuffer);
    gl.drawElements(gl.TRIANGLES, Skysphere.Cube.elementCount, gl.UNSIGNED_SHORT, 0);
    tchSkysphere.DisableAttributes();
    gl.depthMask(true);
}