const zNearPlane = 1.0;
const zFarPlane = 100000.0;
var fov = 2; 

var cameraOffset = new Vector3(0, 4, -7);

const planetParallels = 128;
const planetMeridians = 128;  

const BloomBlurSize = 4;

var SUN = {
    srcTexture0 : "https://i.ibb.co/vXnRgh6/sun.jpg",
    lightIntensity : new Vector4(10, 10, 0, 1)
};  
var MERCURY = {
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
};

var VENUS = {
    srcTexture0 : "https://i.ibb.co/D5M2ndm/2k-venus-surface.jpg"
};

var EARTH = {
    srcTexture0 : "https://i.ibb.co/c1Cw03Y/earth.jpg",
    srcTexture1 : "https://i.ibb.co/WHnwLgj/earth-nightmap.jpg"
};

var MARS = {
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_mars.jpg"
};

var JUPITER = {
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg"
};

var SATURN = {
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg"
};


var URANUS = {
    srcTexture0 : "https://i.ibb.co/gjBTnKs/2k-uranus.jpg"
};

var NEPTUNE = {
    srcTexture0 : "https://i.ibb.co/54LXC3R/2k-neptune.jpg"
};

var PLANETS_DATA = [SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE];