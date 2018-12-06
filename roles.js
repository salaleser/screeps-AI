var role_harvester = require('role_harvester');
var role_builder   = require('role_builder');
var role_upgrader  = require('role_upgrader');
var role_attacker  = require('role_attacker');
var role_claimer   = require('role_claimer');
var role_carrier   = require('role_carrier');
var role_healer    = require('role_healer');

var roles = { run: function(spawn) {

	for (let c in Game.creeps) {
		const creep = Game.creeps[c];
		
		if (spawn.name != creep.memory.spawn) {
			continue;
		}

		const role = creep.memory.role;
		switch(creep.memory.role) {
        case 'harvester':
            role_harvester.run(spawn, creep);
            break;
        case 'builder':
            role_builder.run(spawn, creep);
            break;
        case 'upgrader':
            role_upgrader.run(spawn, creep);
            break;
        case 'carrier':
            role_carrier.run(spawn, creep);
            break;
        case 'attacker':
            role_attacker.run(spawn, creep);
            break;
        case 'claimer':
            role_claimer.run(spawn, creep);
            break;
        case 'healer':
            role_healer.run(spawn, creep);
            break;
		}
	}
	
}};

module.exports = roles;