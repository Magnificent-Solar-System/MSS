let mouseDown = false;
let prevX = 0;
let prevY = 0;
window.onmousedown = function(e) {
    mouseDown = true;
    prevX = e.clientX;
    prevY = e.clientY;
}
window.onmouseup = function(e) {
    mouseDown = false;
}
window.onmousemove = function (e) {
  if (mouseDown) {
      let deltaYaw = -rotationSpeed * (e.clientX - prevX) / canvas.width;
      let deltaPitch = -rotationSpeed * (e.clientY - prevY) / canvas.height; 
      camera.rotate(deltaYaw, deltaPitch, 0);
      prevX = e.clientX;
      prevY = e.clientY;
  }
}

window.onkeydown = function(e) {
    if(e.code == 'KeyQ') fov += 0.03;
    if(e.code == 'KeyE') fov -= 0.03;
    if(e.code == 'Space') {
        enablePostprocessing = !enablePostprocessing;
    }
    if (e.code == 'KeyW') {
        camera.position = vec3.add(camera.position, vec3.mulvs(camera.zAxis, moveSpeed));
    }
    if (e.code == 'KeyA') {
         camera.position = vec3.add(camera.position, vec3.mulvs(camera.xAxis, -moveSpeed));
    }
    if (e.code == 'KeyS') {
         camera.position = vec3.add(camera.position, vec3.mulvs(camera.zAxis, -moveSpeed));
    }
    if (e.code == 'KeyD') {
         camera.position = vec3.add(camera.position, vec3.mulvs(camera.xAxis, moveSpeed));
    }
}
