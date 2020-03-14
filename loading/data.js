//Techniques
var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchPlainColor = new TechniquePlainColor();
var tchStar = new TechniqueStar();
var tchEarth = new TechniqueEarth();
//var tchSkybox = new TechniqueSkybox( [[skybox texture]] );
Postprocessing.Initialize(tchPostProcessing);

sun = new Body(new vec3(0, 0, 0), new vec3(0, 0, 0), SunMass, 50.0 , true , true ,true, "https://i.ibb.co/vXnRgh6/sun.jpg" , 0);

const MERCURY   = 0;
const VENUS     = 1;
const EARTH     = 2;
const MARS      = 3;
const JUPITER   = 4;
const SATURN    = 5;
const URANUS    = 6;
const NEPTUNE   = 7;

var planets = [
    //MERCURY
    new Body(MERCURY_POSITION, MERCURY_VELOCITY, MERCURY_MASS, MERCURY_RADIUS, true, true,false ), 
    //VENUS
    new Body(VENUS_POSITION, VENUS_VELOCITY, VENUS_MASS, VENUS_RADIUS, true, true ,false), 
    //EARTH
    new Body(EARTH_POSITION, EARTH_VELOCITY, EARTH_MASS, EARTH_RADIUS, true, true,false ), 
    //MARS
    new Body(MARS_POSITION, MARS_VELOCITY, MARS_MASS, MARS_RADIUS, true, true,false), 
    //JUPITER
    new Body(JUPITER_POSITION, JUPITER_VELOCITY, JUPITER_MASS, JUPITER_RADIUS, true, true,false), 
    //SATURN
    new Body(SATURN_POSITION, SATURN_VELOCITY, SATURN_MASS, SATURN_RADIUS, true, true,false), 
    //URANUS
    new Body(URANUS_POSITION, URANUS_VELOCITY, URANUS_MASS, URANUS_RADIUS, true, true,false), 
    //NEPTUNE
    new Body(NEPTUNE_POSITION, NEPTUNE_VELOCITY, NEPTUNE_MASS, NEPTUNE_RADIUS, true, true,false), 
];