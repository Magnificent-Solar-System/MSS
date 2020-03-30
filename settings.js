const vec3 = require('./math/vec3.js');

/* SHIP */
global.SHIP_MASS = 10000;
global.SHIP_SCALE = new vec3(1, 1, 1);

global.SHIP_MANEUVERING_FORCE = 10000;
global.SHIP_ACCELERATION_FORCE = 35000;

global.SHIP_MAX_YAW = 1.25;
global.SHIP_MAX_PITCH = 1.25;
global.SHIP_MAX_ROLL = 1.0;

/* ASTRONOMY */

global.SUN = {
    radius : 20,
    mass : 1e13,
    position : vec3.zero()
};

global.MERCURY = {
    mass : 100,
    position : new vec3(-40, 0, 0),
    radius : 8
};

global.VENUS = {
    mass : 100,
    position : new vec3(40, 0, 0),
    radius : 8
};

global.EARTH = {
    mass : 100,
    position : new vec3(40, 30, 0),
    radius : 15
};

global.MARS = {
    mass : 100,
    position : new vec3(0, -50, 0),
    radius : 8
};

global.JUPITER = {
    mass : 100,
    position : new vec3(30, 0, 45),
    radius : 10
};

global.SATURN = {
    mass : 100,
    position : new vec3(30, 10, -30),
    radius : 15
};


global.URANUS = {
    mass : 100,
    position : new vec3(0, 40, 40),
    radius : 14
};

global.NEPTUNE = {
    mass : 100,
    position : new vec3(-40, 40, 0),
    radius : 14
};