var logger = require('logger');

var construct_containers= { run: function(spawn) {
    
    if (Game.time % 101 != 0) {
        return;
    }

	const ps0 = spawn.room.memory.pathSource0;
	
	const pos0 = ps0.path[ps0.path.length - 1];
	spawn.room.createConstructionSite(pos0.x, pos0.y, STRUCTURE_CONTAINER);

	if (spawn.room.controller.level > 2) {
		const pos0 = ps0.path[ps0.path.length - 2];
		spawn.room.createConstructionSite(pos0.x, pos0.y, STRUCTURE_CONTAINER);
	}

	const ps1 = spawn.room.memory.pathSource1;
	if (!ps1) {
    	return;
	}

	const pos1 = ps1.path[ps1.path.length - 1];
	spawn.room.createConstructionSite(pos1.x, pos1.y, STRUCTURE_CONTAINER);

	if (spawn.room.controller.level > 2) {
		const pos1 = ps1.path[ps1.path.length - 2];
		spawn.room.createConstructionSite(pos1.x, pos1.y, STRUCTURE_CONTAINER);
	}

}};

module.exports = construct_containers;