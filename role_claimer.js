var logger = require('logger');

var err;

var role_claimer = { run: function(spawn, creep) {

	const claimStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#8a2be2',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };

	const signText = 'Archspire --- the best death metal band!';
	
	const controller = creep.room.controller;

	const flag = _.filter(Game.flags, (i) => i.color == COLOR_PURPLE)[0];
	if (flag) {
		creep.moveTo(flag, claimStyle);
		return;
	}

	if (controller && !controller.my) {
		err = creep.claimController(controller);
		if (err == OK) {
			console.log(creep.name + ': "Controller at ' + creep.room.name + ' claimed!"');
		}
		if (err == ERR_GCL_NOT_ENOUGH) {
			if (controller.sign) {
				if (controller.sign.text != signText) {
					err = creep.signController(controller, signText);
					if (err == OK) {
						console.log(creep.name + ': "Controller at ' +
							creep.room.name + ' signed!"');
					}
				}
			} else {
				err = creep.signController(controller, signText);
				if (err == OK) {
					console.log(creep.name + ': "Controller at ' + creep.room.name + ' signed!"');
				}
			}
			
			err = creep.reserveController(controller);
			if (err == ERR_INVALID_TARGET) {
				err = creep.attackController(controller);
			}
		}
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(controller, claimStyle);
		} else if (err != OK) {
			logger.error(err, creep.room.name + '.role_claimer:45')
		}
		return;
	} else {
		const origin = new RoomPosition(25, 25, creep.room.name);
		const route = PathFinder.search(origin, controller);
		for (let i = 0; i < route.length; i++) {
			let x = route.path[i].x;
			let y = route.path[i].y;
			err = creep.room.createConstructionSite(x, y, STRUCTURE_SPAWN);
			if (err == OK) {
				break;
			}
			logger.error(err, spawn.name + '.role_claimer.createConstructionSite');
		}
	}

	const exits = Game.map.describeExits(creep.room.name);
	for (let i = 1; i <= 7; i += 2) {
		const exitDir = Game.map.findExit(creep.room, exits[i]);
		if (exitDir == ERR_NO_PATH) {
			continue;
		}
		const exit = creep.pos.findClosestByRange(exitDir);
		err = creep.moveTo(exit, claimStyle);
		if (err == OK) {
			break;
		} else if (err == ERR_NO_PATH) {
			continue;
		}
	}
	
}};

module.exports = role_claimer;