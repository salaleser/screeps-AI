var err;

var unload = { run: function(spawn, creep) {
	
    const transferStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#0ff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.25,
	} };

    if (spawn.energy < spawn.energyCapacity && creep.carry[RESOURCE_ENERGY] > 0) {
		err = creep.transfer(spawn, RESOURCE_ENERGY)
        if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(spawn, transferStyle);
		}
		return;
	}
    const myStructures = spawn.room.find(FIND_MY_STRUCTURES);
	
	const extensions = _.filter(myStructures, (i) => i.structureType == STRUCTURE_EXTENSION);
	const extensionsNotFull = _.filter(extensions, (i) => i.energy < i.energyCapacity);
	if (extensionsNotFull.length > 0 && creep.carry[RESOURCE_ENERGY] > 0) {
		// const o = creep.pos.findClosestByRange(extensionsNotFull);
		const o = Game.getObjectById(extensionsNotFull[0].id);
	    err = creep.transfer(o, RESOURCE_ENERGY);
	    if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(o, transferStyle);
		}
		return;
	}
	
	const towers = _.filter(myStructures, (i) => i.structureType == STRUCTURE_TOWER);
	const towersNotFull = _.filter(towers, (i) => i.energy < i.energyCapacity - 200);
	if (towersNotFull.length > 0 && creep.carry[RESOURCE_ENERGY] > 0) {
	    const o = creep.pos.findClosestByRange(towersNotFull);
		err = creep.transfer(o, RESOURCE_ENERGY);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(o, transferStyle);
		}
		return;
	}
	
	const storage = spawn.room.storage;
	if (storage) {
		if (_.sum(storage.store) < storage.storeCapacity) {
			for (const resourceType in creep.carry) {
				err = creep.transfer(storage, resourceType);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(storage, transferStyle);
				}
			}
			return;
		}
	}

	const creeps = _.filter(Game.creeps, (i) => i.memory.spawn == spawn.name);
	let upgraders = _.filter(creeps, (i) => i.memory.role == 'upgrader');
	upgraders = upgraders.sort((a,b) => a.carry[RESOURCE_ENERGY] - b.carry[RESOURCE_ENERGY]);
	if (upgraders.length > 0) {
		err = creep.transfer(upgraders[0], RESOURCE_ENERGY);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(upgraders[0], transferStyle);
		}
	}
	
}};

module.exports = unload;