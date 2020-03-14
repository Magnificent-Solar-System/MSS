//Techniques
var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchPlainColor = new TechniquePlainColor();
var tchStar = new TechniqueStar();
var tchEarth = new TechniqueEarth();
Postprocessing.Initialize(tchPostProcessing);

function loadTexture(src ){
    let singleTexture = gl.createTexture();
    singleTexture.image = new Image();
    singleTexture.image.onload = function(){
        gl.bindTexture(gl.TEXTURE_2D, singleTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, singleTexture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    singleTexture.image.crossOrigin = "anonymous";
    singleTexture.image.src = src;
    return  singleTexture;
}



sun = new Body(new vec3(0, 0, 0), new vec3(0, 0, 0), SunMass, 50.0 , true , true , loadTexture("https://i.ibb.co/vXnRgh6/sun.jpg"));
earth = new Body(EARTH_POSITION, EARTH_VELOCITY, EARTH_MASS, EARTH_RADIUS, true, true, [loadTexture("https://i.ibb.co/c1Cw03Y/earth.jpg"),loadTexture("https://i.ibb.co/WHnwLgj/earth-nightmap.jpg")] );

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
    new Body(MERCURY_POSITION, MERCURY_VELOCITY, MERCURY_MASS, MERCURY_RADIUS, true, true,loadTexture("https://i.ibb.co/3FKjhWs/mercury.jpg")), 
    //VENUS
    new Body(VENUS_POSITION, VENUS_VELOCITY, VENUS_MASS, VENUS_RADIUS, true, true ,loadTexture("https://i.ibb.co/D5M2ndm/2k-venus-surface.jpg")),  
    //MARS
    new Body(MARS_POSITION, MARS_VELOCITY, MARS_MASS, MARS_RADIUS, true, true,loadTexture("https://i.ibb.co/8mTyX3W/2k-mars.jpg")), 
    //JUPITER
    new Body(JUPITER_POSITION, JUPITER_VELOCITY, JUPITER_MASS, JUPITER_RADIUS, true, true,loadTexture("https://i.ibb.co/WnJWGt4/2k-jupiter.jpg")), 
    //SATURN
    new Body(SATURN_POSITION, SATURN_VELOCITY, SATURN_MASS, SATURN_RADIUS, true, true,loadTexture("https://i.ibb.co/RyKJ7vB/2k-saturn.jpg")), 
    //URANUS
    new Body(URANUS_POSITION, URANUS_VELOCITY, URANUS_MASS, URANUS_RADIUS, true, true,loadTexture("https://i.ibb.co/gjBTnKs/2k-uranus.jpg")), 
    //NEPTUNE
    new Body(NEPTUNE_POSITION, NEPTUNE_VELOCITY, NEPTUNE_MASS, NEPTUNE_RADIUS, true, true,loadTexture("https://i.ibb.co/54LXC3R/2k-neptune.jpg")), 
];