var unload = require('unload');

var err;

var role_carrier = { run: function(spawn, creep) {
		    
	const carryStyle = { visualizePathStyle: {
		stroke: '#aaa',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };

	const pickupStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#000',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
	
	if (creep.carryCapacity == _.sum(creep.carry)) {
		creep.memory.full = true;
	} else if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	
	if (creep.memory.full) {
		unload.run(spawn, creep);
		return;
	} else {
        let dropped = spawn.room.find(FIND_DROPPED_RESOURCES);
        if (dropped.length > 0) {
            err = creep.pickup(dropped[0]);
            if (err == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped[0], pickupStyle);
            }
            return;
		}
		
		const tombstones = spawn.room.find(FIND_TOMBSTONES);
		const tombstonesWithResources = _.filter(tombstones, (i) => _.sum(i.store) > 0);
		if (tombstonesWithResources.length > 0) {
			for (const resourceType in tombstones[0].store) {
				err = creep.withdraw(tombstones[0], resourceType);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(tombstones[0], pickupStyle);
				}
			}
			return;
		}
		
		const structures = spawn.room.find(FIND_STRUCTURES);
    
		let containers = _.filter(structures, (i) => i.structureType == STRUCTURE_CONTAINER);
		containers = _.filter(containers, (i) => i.store[RESOURCE_ENERGY] > 0);
		containers = containers.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
		if (containers.length > 0) {
		    err = creep.withdraw(containers[0], RESOURCE_ENERGY);
			if (err == ERR_NOT_IN_RANGE) {
				creep.moveTo(containers[0], carryStyle);
			}
			return;
		}
	}
    
}};

module.exports = role_carrier;