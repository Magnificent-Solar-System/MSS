/* PROJECTION MATRIX */
const zNearPlane = 0.1;
const zFarPlane = 10000.0;
var fov = 1.2;


/* SHIP */

var rotationSpeed = 1.2;
var moveSpeed = 0.1;


/* ASTRONOMY */

const tmp = 250;
const tmp2 = 1e2;

function startVel(pos) {
    let vel = Math.sqrt(G*SunMass/pos.length);
    let v = vec3.cross(vec3.unitY(), vec3.norm(pos));
    return vec3.mulvs(v, vel);
}


const planetParallels = 128;
const planetMeridians = 128;

var SUN = {
    mass : 1e13,
    position : vec3.zero(),
    radius : 50, 
    velocity : vec3.zero(),
    srcTexture0 : "https://i.ibb.co/vXnRgh6/sun.jpg",
    lightIntensity : new vec4(10, 10, 0, 1),
    separateWorldMatrix : false
};

var MERCURY = {
    mass : tmp2,
    position : new vec3(tmp, 0, 0),
    radius : 3,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg"
};

var VENUS = {
    mass : tmp2,
    position : new vec3(-tmp, 0, 0),
    radius : 5,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://i.ibb.co/D5M2ndm/2k-venus-surface.jpg"
};

var EARTH = {
    mass : tmp2,
    position : new vec3(0, 70, 0),
    radius : 7,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://i.ibb.co/c1Cw03Y/earth.jpg",
    srcTexture1 : "https://i.ibb.co/WHnwLgj/earth-nightmap.jpg"
};

var MARS = {
    mass : tmp2,
    position : new vec3(0, -tmp, 0),
    radius : 8,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_mars.jpg"
};

var JUPITER = {
    mass : tmp2,
    position : new vec3(0, 0, tmp),
    radius : 12,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg"
};

var SATURN = {
    mass : tmp2,
    position : new vec3(0, 0, -tmp),
    radius : 15,
    velocity : new vec3(0, 0, 0),
    srcTexture0 : "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg"
};


var URANUS = {
    mass : tmp2,
    position : new vec3(tmp, 0, tmp),
    radius : 16,
    velocity :  new vec3(0, 0, 0),
    srcTexture0 : "https://i.ibb.co/gjBTnKs/2k-uranus.jpg"
};

var NEPTUNE = {
    mass : tmp2,
    position : new vec3(-tmp, tmp, 0),
    radius : 17,
    velocity :  new vec3(0, 0, 0),
    srcTexture0 : "https://i.ibb.co/54LXC3R/2k-neptune.jpg"
};

var PLANETS = [SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE];