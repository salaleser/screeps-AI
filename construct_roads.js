var logger = require('logger');

var err;

var construct_roads= { run: function(spawn) {
    
    if (Game.time % 103 != 0) {
        return;
	}
    
    const spawnToSource1Path = spawn.room.memory.pathSource0;
	for (let i = 0; i < spawnToSource1Path.path.length; i++) {
	    const pos = spawnToSource1Path.path[i];
    	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
	}
	
	const spawnToSource2Path = spawn.room.memory.pathSource1;
	if (spawnToSource2Path) {
		for (let i = 0; i < spawnToSource2Path.path.length; i++) {
			const pos = spawnToSource2Path.path[i];
        	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
	    }
	}
	
	const spawnToControllerPath = spawn.room.memory.pathController;
	for (let i = 0; i < spawnToControllerPath.path.length; i++) {
	    const pos = spawnToControllerPath.path[i];
    	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
	}
	
	const spawnToExtractorPath = spawn.room.memory.pathExtractor;
	for (let i = 0; i < spawnToExtractorPath.path.length; i++) {
	    const pos = spawnToExtractorPath.path[i];
    	err = spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
	}
	
	if (spawn.room.controller.level > 3) {
		// TODO construct roads from source0 to source1
	}
	
}};

module.exports = construct_roads;