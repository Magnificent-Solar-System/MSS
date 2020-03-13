/* PROJECTION MATRIX */
const zNearPlane = 0.1;
const zFarPlane = 1000.0;
const fov = 1.2;

/* RENDER TARGET */

const rtAspectRatio = 1.85 / 1.0;
const targetTextureHeight = 1000;

const targetTextureWidth = rtAspectRatio * targetTextureHeight;


/* SHIP */

var rotationSpeed = 1.2;
var moveSpeed = 0.05;


/* ASTRONOMY */

const planetParallels = 128;
const planetMeridians = 128;
const SunColor = new vec4(10, 10, 0, 1);
