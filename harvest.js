var err;

var harvest = { run: function(spawn, creep) {

	const harvestStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#0ff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.25,
	} };
	
	const sources = creep.room.find(FIND_SOURCES);
	let sourceNumber = 0;

	const isPolymorph = spawn.memory.counts.carriers.length > 0;
    
    if (creep.memory.source) {

		if (isPolymorph) {
			let creeps = _.filter(Game.creeps, (i) => i.memory.spawn == spawn.name);
			let harvesters = _.filter(creeps, (i) => i.memory.role == 'harvester');
			for (let i = 0; i < harvesters.length; i++) {
				if (harvesters[i].name == creep.name) {
					continue;
				}
				if (creep.memory.source != harvesters[i].memory.source) {
					continue;
				}
				if (sources.length > 1) {
					if (sourceNumber == 0) {
						sourceNumber = 1;
					} else {
						sourceNumber = 0;
					}
				// 	console.log(spawn.name, creep.name, sources[sourceNumber].id);
	                creep.memory.source = sources[sourceNumber].id;
				// 	return;
				}
			}
		}

		const source = Game.getObjectById(creep.memory.source);
		err = creep.harvest(source);
		if (err == ERR_NOT_IN_RANGE) {
			err = creep.moveTo(source, harvestStyle);
			if (err == ERR_NO_PATH || err == ERR_NOT_ENOUGH_RESOURCES) {
				if (sources.length > 1) {
					if (sourceNumber == 0) {
						sourceNumber = 1;
					} else {
						sourceNumber = 0;
					}
					creep.memory.source = sources[sourceNumber].id;
					return;
				}
			}
		}
		if (creep.carry.energy == creep.carryCapacity) {
			delete creep.memory.source;
		}
		return;
	}

	creep.memory.source = sources[sourceNumber].id;
    
}};

module.exports = harvest;