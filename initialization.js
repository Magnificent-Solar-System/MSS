const Transform = require(global.dirname + '/objects/Transform.js');
const Quaternion = require(global.dirname + '/math/quaternion.js');
const vec3 = require(global.dirname + '/math/vec3.js');
const Body = require(global.dirname + '/objects/body.js');

module.exports = function(planets) {
    planets[0] = {
        transform : new Transform( global.SUN.position, Quaternion.Identity(), vec3.fromScalar(global.SUN.radius))
    };
    planets[0].body = new Body(planets[0].transform, global.SUN.mass);
    global.SUN = planets[0];
    
    planets[1] = {
        transform : new Transform( global.MERCURY.position, Quaternion.Identity(), vec3.fromScalar(global.MERCURY.radius))
    };
    planets[1].body = new Body(planets[1].transform, global.MERCURY.mass);
    global.MERCURY = planets[1];
    
    planets[2] = {
        transform : new Transform( global.VENUS.position, Quaternion.Identity(), vec3.fromScalar(global.VENUS.radius))
    };
    planets[2].body = new Body(planets[2].transform, global.VENUS.mass);
    global.VENUS = planets[2];
    
    planets[3] = {
        transform : new Transform( global.EARTH.position, Quaternion.Identity(), vec3.fromScalar(global.EARTH.radius))
    };
    planets[3].body = new Body(planets[3].transform, global.EARTH.mass);
    global.EARTH = planets[3];
    
    planets[4] = {
        transform : new Transform( global.MARS.position, Quaternion.Identity(), vec3.fromScalar(global.MARS.radius))
    };
    planets[4].body = new Body(planets[4].transform, global.MARS.mass);
    global.MARS = planets[4];
    
    planets[5] = {
        transform : new Transform( global.JUPITER.position, Quaternion.Identity(), vec3.fromScalar(global.JUPITER.radius))
    };
    planets[5].body = new Body(planets[5].transform, global.JUPITER.mass);
    global.JUPITER = planets[5];

    planets[6] = {
        transform : new Transform( global.SATURN.position, Quaternion.Identity(), vec3.fromScalar(global.SATURN.radius))
    };
    planets[6].body = new Body(planets[6].transform, global.SATURN.mass);
    global.SATURN = planets[6];
    
    planets[7] = {
        transform : new Transform( global.URANUS.position, Quaternion.Identity(), vec3.fromScalar(global.URANUS.radius))
    };
    planets[7].body = new Body(planets[7].transform, global.URANUS.mass);
    global.URANUS = planets[7];

    planets[8] = {
        transform : new Transform( global.NEPTUNE.position, Quaternion.Identity(), vec3.fromScalar(global.NEPTUNE.radius))
    };
    planets[8].body = new Body(planets[8].transform, global.NEPTUNE.mass);
    global.NEPTUNE = planets[8];
    
    global.concommands["mx"] = function(args){ planets[Number(args[0])].transform.position.x += Number(args[1]); }
    global.concommands["mz"] = function(args){ planets[Number(args[0])].transform.position.z += Number(args[1]); }
    global.concommands["my"] = function(args){ planets[Number(args[0])].transform.position.y += Number(args[1]); }
};