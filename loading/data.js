//Techniques
var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchPlainColor = new TechniquePlainColor();
var tchStar = new TechniqueStar();

Postprocessing.Initialize(tchPostProcessing);

//Planets
earth = new Body(new vec3(0, 0, 0), new vec3(1, 0, 0), 5.972e24, 1.0, true, true);
sun = new Body(new vec3(2, 0, 0), new vec3(1, 0, 0), 1.98847e30, 1.0);