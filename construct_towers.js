var logger = require('logger');

var err;

var construct_towers= { run: function(spawn) {
    
    if (Game.time % 105 != 0) {
        return;
	}
	
	// const towers = _.filter(myStructures, (i) => i.structureType == STRUCTURE_TOWER);
	err = spawn.room.createConstructionSite(spawn.pos.x - 1, spawn.pos.y, STRUCTURE_TOWER);
	if (err != OK && err == ERR_INVALID_TARGET) {
	    logger.error(err, spawn.name + '.construct_towers.1')
	}
	err = spawn.room.createConstructionSite(spawn.pos.x + 1, spawn.pos.y, STRUCTURE_TOWER);
	if (err != OK && err == ERR_INVALID_TARGET) {
	    logger.error(err, spawn.name + '.construct_towers.2')
	}
	
}};

module.exports = construct_towers;
