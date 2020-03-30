const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_Q = 81;
const KEY_E = 69;
const KEY_Z = 90;
const KEY_X = 88;
const KEY_C = 67;
const KEY_D1 = 49;
const KEY_D2 = 50;
const KEY_D3 = 51;
const KEY_SPACE = 32;
var KEYDOWN = new Array(256);
KEYDOWN.fill(false);

var MouseDeltaX = 0;
var MouseDeltaY = 0;
var MouseDown = false;
var MousePrevX, MousePrevY;


function sendInput(){
    if(document.hasFocus()) {
        socket.emit("game_input", [ 
            KEYDOWN[KEY_Q] ? -1 : (KEYDOWN[KEY_E] ? 1 : 0),     //Roll
            MouseDeltaX,                                        //Yaw
            MouseDeltaY,                                        //Pitch
            KEYDOWN[KEY_W],                                     //Acceleration
            KEYDOWN[KEY_X],                                     //Rotation Stop
            KEYDOWN[KEY_SPACE]                                  //Shoot
        ]);
        MouseDeltaX = 0;
        MouseDeltaY = 0;
      }
}

document.addEventListener('keydown', function(event) {
  KEYDOWN[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
  KEYDOWN[event.keyCode] = false;
});
document.addEventListener('mousedown', function(event) {
  MouseDown = true;
  MousePrevX = event.clientX;
  MousePrevY = event.clientY;
});
document.addEventListener('mouseup', function() {
  MouseDown = false;
});
document.addEventListener('mousemove', function(event) {
  if (MouseDown) {
    MouseDeltaX += (event.clientX - MousePrevX) / canvas.width * 2;
    MouseDeltaY += (event.clientY - MousePrevY) / canvas.height * 2;
    MousePrevX = event.clientX;
    MousePrevY = event.clientY;
  }
});