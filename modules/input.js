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
      let rotationSpeed = 0.5;
      let deltaYaw = -rotationSpeed * (e.clientX - prevX) / canvas.width;
      let deltaPitch = -rotationSpeed * (e.clientY - prevY) / canvas.height; 
      
      ship.transform.rotate(deltaYaw, deltaPitch, 0.0);
      
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
        ship.body.applyForce(vec3.mulvs(ship.transform.forward, SHIP_ACCELERATION_FORCE));
    }
    if (e.code == 'KeyA') {
         ship.body.applyForce(vec3.mulvs(ship.transform.right, -SHIP_MANEUVERING_FORCE));
    }
    if (e.code == 'KeyD') {
         ship.body.applyForce(vec3.mulvs(ship.transform.right, SHIP_MANEUVERING_FORCE));
    }
}
