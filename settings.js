/* PROJECTION MATRIX */
const zNearPlane = 0.1;
const zFarPlane = 10000.0;
const fov = 1.2;

/* RENDER TARGET */

const rtAspectRatio = 1.85 / 1.0;
const targetTextureHeight = 1000;

const targetTextureWidth = rtAspectRatio * targetTextureHeight;


/* SHIP */

var rotationSpeed = 1.2;
var moveSpeed = 0.1;


/* ASTRONOMY */

const SunMass = 1e17;
const tmp = 250;
const tmp2 = 1e2;

function startVel(pos) {
    let vel = Math.sqrt(G*SunMass/pos.length);
    let v = vec3.cross(vec3.unitY(), vec3.norm(pos));
    return vec3.mulvs(v, vel);
}


const planetParallels = 128;
const planetMeridians = 128;
const SunColor = new vec4(10, 10, 0, 1);
/* planets */
const MERCURY_MASS = tmp2;
const MERCURY_POSITION = new vec3(tmp, 0, 0);
const MERCURY_RADIUS = 3;
const MERCURY_VELOCITY = startVel(MERCURY_POSITION);

const VENUS_MASS = tmp2;
const VENUS_POSITION = new vec3(-tmp, 0, 0);
const VENUS_RADIUS = 5;
const VENUS_VELOCITY = startVel(VENUS_POSITION);

const EARTH_MASS = tmp2;
const EARTH_POSITION = new vec3(0, tmp, 0);
const EARTH_RADIUS = 7;
const EARTH_VELOCITY = startVel(EARTH_POSITION);

const MARS_MASS = tmp2;
const MARS_POSITION = new vec3(0, -tmp, 0);
const MARS_RADIUS = 8;
const MARS_VELOCITY = startVel(MARS_POSITION);

const JUPITER_MASS = tmp2;
const JUPITER_POSITION = new vec3(0, 0, tmp);
const JUPITER_RADIUS = 12;
const JUPITER_VELOCITY = startVel(JUPITER_POSITION);

const SATURN_MASS = tmp2;
const SATURN_POSITION = new vec3(0, 0, -tmp);
const SATURN_RADIUS = 15;
const SATURN_VELOCITY = startVel(SATURN_POSITION);

const URANUS_MASS = tmp2;
const URANUS_POSITION = new vec3(tmp, 0, tmp);
const URANUS_RADIUS = 16;
const URANUS_VELOCITY = startVel(URANUS_POSITION);

const NEPTUNE_MASS = tmp2;
const NEPTUNE_POSITION = new vec3(-tmp, tmp, 0);
const NEPTUNE_RADIUS = 17;
const NEPTUNE_VELOCITY = startVel(NEPTUNE_POSITION);