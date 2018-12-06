var logger = require('logger');

var err;

var construct_storage = { run: function(spawn) {
    
    if (spawn.room.controller.level < 4) {
		return;
	}

	if (spawn.room.storage) {
		return;
	}
	
	const pathController = spawn.room.memory.pathController;
	if (!pathController) {
		return;
	}
	
	const path = pathController.path;
	if (!path) {
	    console.log('construct_storage: "No pathController.path"', spawn.name, pathController);
	    return;
	}

	let offset = 2;
	if (path.length < offset) {
		offset = 0;
	}
	const pos = path[path.length - offset - 1];

	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_STORAGE);
	if (err == ERR_INVALID_TARGET) {
		err = spawn.room.createConstructionSite(pos.x - 1, pos.y, STRUCTURE_STORAGE);
	} else if (err == ERR_RCL_NOT_ENOUGH) {
		return;
	} else {
	    logger.error(err, 'createConstructionSite', spawn.name + '.construct_storage(' + pos.x + ', ' + pos.y + ')');
	}
	
}};

module.exports = construct_storage;