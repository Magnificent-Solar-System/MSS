const vec3 = require('./math/vec3.js');
const quat = require('./math/quaternion.js');
const Ship = require('./objects/ship.js');

var planets = [];
var players = {};
var ships = [];

function update() {
    const deltaTime = 0.001 * 15; 
    for(var i = 0; i < ships.length; ++i) ships[i].update(deltaTime);
    
    io.emit("game_state", [ships, planets]); 
}

module.exports = {
    connection : function(socket) {
        console.log('Player connected. ', socket.id);
        players[socket.id] = {
            ship : ships.length
        };
        ships.push(new Ship(socket.id, new vec3((Math.random() - 0.5) * 5, 40, -110)));
        ships[ships.length - 1].transform.rotate(3.14, 0, 0);

        socket.on('disconnect', function(){
            console.log('Player disconnected. ', socket.id);
            let ply = players[socket.id];
            ships[ply.ship] = ships[ships.length - 1];
            ships.length--;
            delete players[socket.id];
        });
        
        socket.on("game_input", function(input){
            let pbody = ships[players[socket.id].ship].body;
            if(input[3]) pbody.applyForce(vec3.mulvs(pbody.transform.forward, global.SHIP_ACCELERATION_FORCE));
            pbody.transform.rotate(-input[1] * 0.3, input[2] * 0.3, input[0] * 0.3);
            
        });
    },
    start : function() {
        require("./initialization.js")(planets);
        setInterval(update, 15);
    }
}