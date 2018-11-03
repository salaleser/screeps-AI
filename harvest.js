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

    if (creep.memory.source) {

		const harvesters = _.filter(Game.creeps, (i) => i.memory.spawn == spawn.name
			&& i.memory.role == 'harvester'
			&& i.name != creep.name
			&& i.memory.source == creep.memory.source);
		if (harvesters.length > 0 && sources.length > 1) {
			creep.memory.source = sources[1].id;
		}

		const source = Game.getObjectById(creep.memory.source);
		err = creep.harvest(source);
		if (err == ERR_NOT_IN_RANGE) {
			err = creep.moveTo(source, harvestStyle);
		}
		if (creep.carry.energy == creep.carryCapacity) {
			delete creep.memory.source;
		}
		return;
	}

	creep.memory.source = sources[0].id;
    
}};

module.exports = harvest;