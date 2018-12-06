var logger = require('logger');

var err;

var construct_containers= { run: function(spawn) {
    
    if (Game.time % 101 != 0) {
        return;
    }

	let object;
	object = spawn.room.memory.pathSource0;
	if (object) {
    	const pos = object.path[object.path.length - 1];
		spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);

		if (spawn.room.controller.level > 2) {
			const pos = object.path[object.path.length - 2];
			spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
		}
	}
	
	object = spawn.room.memory.pathSource1;
	if (object) {
    	const pos = object.path[object.path.length - 1];
		spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);

		if (spawn.room.controller.level > 2) {
			const pos = object.path[object.path.length - 2];
			spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
		}
	}

	object = spawn.room.memory.pathExtractor;
	if (object) {
		if (spawn.room.controller.level > 5) {
			const pos = object.path[object.path.length - 1];
			err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
			if (err == ERR_RCL_NOT_ENOUGH) {
				return;
			} else {
				logger.error(err, 'createConstructionSite', spawn.name +
					'.construct_containers(' + pos.x + ', ' + pos.y + ')')
			}
		}
	}

}};

module.exports = construct_containers;