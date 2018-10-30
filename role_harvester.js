var harvest = require('harvest');
var unload  = require('unload');

var err;

var role_harvester = { run: function(spawn, creep) {

	const pickupStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#00f',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
	
	const harvestStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#0ff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
    
    if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	} else if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	const isPolymorph = spawn.memory.counts.carriers.length > 0;
	
    if (creep.memory.full) {
		if (isPolymorph) {
			const structures = spawn.room.find(FIND_STRUCTURES);
			const containers = _.filter(structures, (i) => i.structureType == STRUCTURE_CONTAINER);
			const containersNotFull = _.filter(containers, (i) => i.store[RESOURCE_ENERGY] < i.storeCapacity);
			if (containersNotFull.length > 0) {
				const o = creep.pos.findClosestByRange(containersNotFull);
				err = creep.transfer(o, RESOURCE_ENERGY);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(o, pickupStyle);
				}
				return;
			}
		}
		unload.run(spawn, creep);
		return;
	}
	
	if (spawn.memory.counts.harvesters > 1) {
	    for (let f in Game.flags) {
    		let flag = Game.flags[f];
    		if (flag.color == COLOR_YELLOW) {
    			creep.moveTo(flag, harvestStyle);
    			return;
    		}
    	}
	}
	
    harvest.run(spawn, creep);

}};

module.exports = role_harvester;