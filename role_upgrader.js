var harvest = require('harvest');

var err;

var role_upgrader = { run: function(spawn, creep) {

	if (creep.carryCapacity == _.sum(creep.carry)) {
		creep.memory.full = true;
	} else if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	if (creep.memory.full) {
	    const controller = creep.room.controller;
	    let err = creep.upgradeController(controller);
		if (err == ERR_NOT_IN_RANGE) {
			err = creep.moveTo(controller);
		}
		return;
	}
	
	const storage = spawn.room.storage;
	if (storage && storage.store[RESOURCE_ENERGY] > 0) {
		err = creep.withdraw(storage, RESOURCE_ENERGY);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(storage);
		}
		return;
	}
	harvest.run(spawn, creep);
	
}};

module.exports = role_upgrader;