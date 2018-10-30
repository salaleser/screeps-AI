var harvest = require('harvest');

var err;

var role_builder = { run: function(spawn, creep) {

	const buildStyle = { visualizePathStyle: {
		stroke: '#ffa500',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };

	const structures = spawn.room.find(FIND_STRUCTURES);
	
	if (creep.carryCapacity == _.sum(creep.carry)) {
		creep.memory.full = true;
	} else if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	const allSites = Game.constructionSites;
	const newSpawn = _.filter(allSites, (i) => i.structureType == STRUCTURE_SPAWN)[0];
	if (newSpawn) {
		if (creep.memory.full) {
			err = creep.build(newSpawn);
			if (err == ERR_NOT_IN_RANGE) {
				creep.moveTo(newSpawn, buildStyle);
			}
			return;
		}
		harvest.run(spawn, creep);
		return;
	}

	if (creep.memory.full) {
		const sites = spawn.room.find(FIND_CONSTRUCTION_SITES);
		if (!sites) {
			let targets = _.filter(structures, (i) => i.hits < i.hitsMax);
			targets.sort((a, b) => a.hits - b.hits);
			if (targets.length > 0) {
			    err = creep.repair(targets[0]);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
		}

		let site = sites[0];
        
		const extensions = _.filter(sites, (i) => i.structureType == STRUCTURE_EXTENSION);
	    const containers = _.filter(sites, (i) => i.structureType == STRUCTURE_CONTAINER);
    	if (extensions.length > 0) {
			site = extensions[0];
		} else if (containers.length > 0) {
    		site = containers[0];
    	}
		
		err = creep.build(site);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(site, buildStyle);
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

module.exports = role_builder;