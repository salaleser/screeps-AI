var logger = require('logger');

var construct_extensions = require('construct_extensions');
var construct_containers = require('construct_containers');
var construct_storage    = require('construct_storage');
var construct_towers     = require('construct_towers');
var construct_roads      = require('construct_roads');

var construct = { run: function(spawn) {

    // Refresh paths
    if (Game.time % 666 == 0) {
        delete spawn.room.memory.pathSource0;
        delete spawn.room.memory.pathSource1;
        delete spawn.room.memory.pathController;
	}
    
    const sources = spawn.room.find(FIND_SOURCES);
    const controller = spawn.room.controller;
	const opts = { maxOps: 5000 };
	const origin = spawn.pos;
	if (!spawn.room.memory.pathSource0) {
	    const goal = { pos: sources[0].pos, range: 1 };
	    const path = PathFinder.search(origin, goal, opts);
	    spawn.room.memory.pathSource0 = path;
    } else if (!spawn.room.memory.pathSource1 && sources.length > 1) {
        const goal = { pos: sources[1].pos, range: 1 };
        const path = PathFinder.search(origin, goal, opts);
	    spawn.room.memory.pathSource1 = path;
    } else if (!spawn.room.memory.pathController) {
        const goal = { pos: controller.pos, range: 3 };
        const path = PathFinder.search(origin, goal, opts);
        spawn.room.memory.pathController = path;
    }
	
	construct_extensions.run(spawn);
    construct_containers.run(spawn);
    construct_storage.run(spawn);
    construct_towers.run(spawn);
    construct_roads.run(spawn);
    
	// добавить постройку контейнеров и хранилища
	
}};

module.exports = construct;