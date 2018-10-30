var logger = require('logger');

var err;

var construct_extensions = { run: function(spawn) {

    if (Game.time % 106 != 0) {
        return;
	}
	
	const sources = spawn.room.find(FIND_SOURCES);
	
	const posX = spawn.pos.x - 3;
	const posY = spawn.pos.y - 3;
	const level = spawn.room.controller.level;
	const available = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level];
	
	let offsetX = 0;
	let offsetY = 0;
	for (let i = 0; i <= available + 100; i++) { // FIXME condition
		let x = posX + offsetX;
		let y = posY + offsetY;
		// FIXME FIXME FIXME
		let pos = sources[0].pos;
		if (pos.x - 1 == x && pos.y - 1 == y ||
				pos.x + 0 == x && pos.y - 1 == y ||
				pos.x + 0 == x && pos.y - 1 == y ||
				pos.x - 1 == x && pos.y + 0 == y ||
				pos.x + 0 == x && pos.y + 0 == y ||
				pos.x + 1 == x && pos.y + 0 == y ||
				pos.x - 1 == x && pos.y + 1 == y ||
				pos.x + 0 == x && pos.y + 1 == y ||
				pos.x + 0 == x && pos.y + 1 == y) {
			if (i > 0 && i % 4 == 0) {
				offsetX++;
				if (offsetY % 2 == 0) {
					offsetY = 1;
				} else {
					offsetY = 0;
				}
			} else {
				offsetY += 2;
			}
			continue;
		}
		// FIXME FIXME FIXME
		if (sources.length > 1) {
			pos = sources[1].pos;
			if (pos.x - 1 == x && pos.y - 1 == y ||
					pos.x + 0 == x && pos.y - 1 == y ||
					pos.x + 0 == x && pos.y - 1 == y ||
					pos.x - 1 == x && pos.y + 0 == y ||
					pos.x + 0 == x && pos.y + 0 == y ||
					pos.x + 1 == x && pos.y + 0 == y ||
					pos.x - 1 == x && pos.y + 1 == y ||
					pos.x + 0 == x && pos.y + 1 == y ||
					pos.x + 0 == x && pos.y + 1 == y) {
				if (i > 0 && i % 4 == 0) {
					offsetX++;
					if (offsetY % 2 == 0) {
						offsetY = 1;
					} else {
						offsetY = 0;
					}
				} else {
					offsetY += 2;
				}
				continue;
			}
		}
		
		err = spawn.room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
		if (err == ERR_RCL_NOT_ENOUGH) {
			break;
		}
		if (err == ERR_INVALID_TARGET) {
			if (i > 0 && i % 4 == 0) {
				offsetX++;
				if (offsetY % 2 == 0) {
					offsetY = 1;
				} else {
					offsetY = 0;
				}
			} else {
				offsetY += 2;
			}
			continue;
		}
		if (err != OK) {
			logger.error(err, spawn.name + '.construct_extensions(' + x + ', ' + y + ')');
		}
	}

    // FIXME придумать алгоритм нормальный
	spawn.room.createConstructionSite(spawn.pos.x - 1, spawn.pos.y - 0, STRUCTURE_ROAD);
	spawn.room.createConstructionSite(spawn.pos.x - 0, spawn.pos.y - 1, STRUCTURE_ROAD);
	spawn.room.createConstructionSite(spawn.pos.x + 1, spawn.pos.y + 0, STRUCTURE_ROAD);
	spawn.room.createConstructionSite(spawn.pos.x + 0, spawn.pos.y + 1, STRUCTURE_ROAD);
	
}};

module.exports = construct_extensions;