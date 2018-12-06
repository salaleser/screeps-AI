var harvest = require('harvest');
var unload  = require('unload');
var logger  = require('logger');

var err;

var role_harvester = { run: function(spawn, creep) {

	const harvestStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#0ff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
    
    if (creep.carryCapacity == _.sum(creep.carry)) {
		creep.memory.full = true;
	} else if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	const isPolymorph = spawn.memory.counts.carriers.length > 0;
	
    if (creep.memory.full) {
		if (isPolymorph) {
			const structures = spawn.room.find(FIND_STRUCTURES);
			const containers = _.filter(structures, (i) => i.structureType == STRUCTURE_CONTAINER);
			const containersNotFull =
				_.filter(containers, (i) => i.store[RESOURCE_ENERGY] < i.storeCapacity);
			if (containersNotFull.length > 0) {
				const container = creep.pos.findClosestByRange(containersNotFull);
				for (const resourceType in creep.carry) {
					err = creep.transfer(container, resourceType);
					if (err == ERR_NOT_IN_RANGE) {
						creep.moveTo(container, harvestStyle);
					}
				}
				return;
			}
		}
		unload.run(spawn, creep);
		return;
	}
	
	// if (spawn.memory.counts.harvesters > 1) {
	//     for (let f in Game.flags) {
    // 		let flag = Game.flags[f];
    // 		if (flag.color == COLOR_YELLOW) {
    // 			creep.moveTo(flag, harvestStyle);
    // 			return;
    // 		}
    // 	}
	// }
	
    const source = Game.getObjectById(creep.memory.source);
	err = creep.harvest(source);
	switch(err) {
    	case OK:
    	case ERR_NOT_ENOUGH_ENERGY:
    	case ERR_BUSY:
    	    break;
        case ERR_NOT_IN_RANGE:
            err = creep.moveTo(source, harvestStyle);
            break;
        case ERR_RCL_NOT_ENOUGH:
            const source0id = spawn.room.find(FIND_SOURCES)[0].id;
    		if (creep.memory.source != source0id) {
    		    creep.memory.source = source0id;
    		}
    		break;
    	default:
    	    logger.error(err, 'harvest', 'role_harvester: ' + creep.name + '.harvest(' + source.pos + ')');
	}

}};

module.exports = role_harvester;