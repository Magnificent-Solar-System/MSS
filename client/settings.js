const zNearPlane = 1.0;
const zFarPlane = 100000.0;
var fov = 2; 

var cameraOffset = new Vector3(0, 4, -7);

const planetParallels = 128;
const planetMeridians = 128;  

const BloomBlurSize =4;

var SUN = {
    srcTexture0 : "textures/8k_sun.jpg",
    lightIntensity : new Vector4(10, 10, 0, 1)
};  
var MERCURY = {
    srcTexture0 : "textures/8k_mercury.jpg"
};

var VENUS = {
    srcTexture0 : "textures/8k_venus_surface.jpg"
};

var EARTH = {
    srcTexture0 : "textures/8k_earth_daymap.jpg",
    srcTexture1 : "textures/8k_earth_nightmap.jpg"
};

var MARS = {
    srcTexture0 : "textures/8k_mars.jpg"
};

var JUPITER = {
    srcTexture0 : "textures/8k_jupiter.jpg"
};

var SATURN = {
    srcTexture0 : "textures/8k_saturn.jpg"
};


var URANUS = {
    srcTexture0 : "textures/2k_uranus.jpg"
};

var NEPTUNE = {
    srcTexture0 : "textures/2k_neptune.jpg"
};

var SHIP = {
    srcTexture0 : "textures/ship.jpg"
};

var PLANETS_DATA = [SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE];