//Techniques
var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchPlainColor = new TechniquePlainColor();
var tchStar = new TechniqueStar();
var tchEarth = new TechniqueEarth();

function getVelocity(acceleration, radius) {
    return Math.sqrt(acceleration * radius);
}

Postprocessing.Initialize(tchPostProcessing);

//Planets

let r = 25;
let Em = 5.972e2;
let Sm = 1.98847e12 * 4;
let F = G * Em * Sm / (r * r);
let accel = F / Em;

earth = new Body(new vec3(r, 0, 0), new vec3(0, 0, 1).mul(getVelocity(accel, r) + 30), 5.972e24, 2.0, true, true);
sun = new Body(new vec3(0, 0, 0), new vec3(0, 0, 0), 1.98847e30, 5.0);