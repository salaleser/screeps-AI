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
	
	if (_.sum(creep.carry) == creep.carryCapacity) {
		creep.memory.full = true;
	} else if (_.sum(creep.carry) == 0) {
		creep.memory.full = false;
	}
	
	if (creep.memory.full) {
		unload.run(spawn, creep);
		return;
	} else {
	    const storage = creep.room.storage;
	    if (storage) {
	        let dropped = spawn.room.find(FIND_DROPPED_RESOURCES);
            if (dropped.length > 0) {
                err = creep.pickup(dropped[0]);
                if (err == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0], pickupStyle);
                }
                return;
    		}
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
		let containers = _.filter(structures, (i) => i.structureType == STRUCTURE_CONTAINER
			&& _.sum(i.store) > 0);
		containers = containers.sort((a,b) => _.sum(b.store) - _.sum(a.store));
		if (containers.length > 0) {
		    for (const resourceType in containers[0].store) {
				err = creep.withdraw(containers[0], resourceType);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(containers[0], carryStyle);
				}
			}
			return;
		}
	}
    
}};

module.exports = role_carrier;