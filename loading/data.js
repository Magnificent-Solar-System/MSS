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

/* TECHNIQUES */

var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchSun = new TechniqueSun();
var tchEarth = new TechniqueEarth();
Postprocessing.Initialize(tchPostProcessing);

/* PLANETS */

function loadPlanets(...planets) {
    for(let i = 0; i < planets.length; i++) {
        if(planets[i].technique === undefined) planets[i].technique = tchPlanet;
        planets[i].texture0 = loadTexture(planets[i].srcTexture0);
        if(planets[i].srcTexture1 !== undefined) planets[i].texture1 = loadTexture(planets[i].srcTexture1);
        if(planets[i].srcTexture2 !== undefined) planets[i].texture2 = loadTexture(planets[i].srcTexture2);
        
        //pre-cached matrices
        planets[i].mat_rotation = new mat4();
        planets[i].mat_scale = new mat4();
        planets[i].mat_translation = new mat4();
        planets[i].mat_world = new mat4();
        
        //scale never changes, compute now
        mat4.Scale(planets[i].mat_scale, vec3.fromScalar(planets[i].radius));
    }
}

var planetGeometry = geomSphere(planetParallels, planetMeridians, 1.0, true, true);

SUN.technique = tchSun;
EARTH.technique = tchEarth;

loadPlanets(SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE);