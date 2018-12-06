var logger = require('logger');

var err;

var construct_extractor= { run: function(spawn) {
    
    if (spawn.room.controller.level < 6) {
		return;
	}

	const structures = spawn.room.find(FIND_STRUCTURES);
	const extractors = _.filter(structures, (i) => i.structureType == STRUCTURE_EXTRACTOR);
	if (extractors.length > 0) {
		return;
	}
	
	const minerals = spawn.room.find(FIND_MINERALS);
	const pos = minerals[0].pos;
	
	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTRACTOR);
	if (err == ERR_RCL_NOT_ENOUGH) {
		return;
	} else {
	    logger.error(err, 'createConstructionSite', spawn.name + '.construct_extractor(' + pos.x + ', ' + pos.y + ')');
	}
	
}};

module.exports = construct_extractor;