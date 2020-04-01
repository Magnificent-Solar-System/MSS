const vec3 = require('./math/vec3.js');
const quat = require('./math/quaternion.js');
const Ship = require('./objects/ship.js');

var planets = [];
var players = {};
var ships = [];
var lasers = [];

function ShootLaser(tfCannon) {
    lasers.push({
        position : vec3.add(tfCannon.position, vec3.mulvs(tfCannon.forward, 3)),
        velocity : vec3.mulvs(tfCannon.forward, 80),
        life : 5
    });
}

function update() {
    const deltaTime = 0.001 * 15;
    
    let rsd = deltaTime * global.SHIP_ROTATION_SPEED; 

    const playerIDs = Object.keys(players); 
    for(var i = 0; i < playerIDs.length; ++i) {
        var ply = players[playerIDs[i]];

        if(ply.input !== undefined) {
            if(ships[ply.ship] !== undefined) {
                let pbody = ships[ply.ship].body;
                if(ply.input[3]) pbody.applyForce(vec3.mulvs(pbody.transform.forward, global.SHIP_ACCELERATION_FORCE));
                pbody.transform.rotate(-ply.input[1] * rsd, -ply.input[2] * rsd, ply.input[0] * rsd);
                if(ply.input[5]) ShootLaser(pbody.transform);
            }
        }
        ships[ply.ship].update(deltaTime);
    }
    let lasersCount = lasers.length;
    for(var i = 0; i < lasersCount; i++) {
        lasers[i].life -= deltaTime;
        if(lasers[i].life < 0.0) {
            --lasersCount;
            lasers[i] = lasers[lasersCount];
            --i;
        } else {
            lasers[i].position = vec3.add(lasers[i].position, vec3.mulvs(lasers[i].velocity, deltaTime));
        }
    }
    lasers.length = lasersCount;

    io.emit("game_state", [ships, planets, lasers]); 
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
            if(!players.hasOwnProperty(socket.id)) return;

            if(input[0] > global.SHIP_MAX_ROLL) input[0] = global.SHIP_MAX_ROLL;
            else if(input[0] < -global.SHIP_MAX_ROLL) input[0] -= global.SHIP_MAX_ROLL;
            if(input[1] > global.SHIP_MAX_YAW) input[1] = global.SHIP_MAX_YAW;
            else if(input[1] < -global.SHIP_MAX_YAW) input[1] -= global.SHIP_MAX_YAW;
            if(input[2] > global.SHIP_MAX_PITCH) input[2] = global.SHIP_MAX_PITCH;
            else if(input[2] < -global.SHIP_MAX_PITCH) input[2] -= global.SHIP_MAX_PITCH;

            players[socket.id].input = input;
        });
    },
    start : function() {
        require("./initialization.js")(planets);
        setInterval(update, 15);
    }
}