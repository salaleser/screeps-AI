var visuals   = require('visuals');
var tower     = require('tower');
var roles     = require('roles');
var construct = require('construct');
var spawner   = require('spawner');

module.exports.loop = function () {
	'use strict';
	
	let spawnNumber = 0;
	for (const s in Game.spawns) {
		const spawn = Game.spawns[s];
		const m = spawn.memory;
		
		let level = spawn.room.controller.level;

		const creeps = _.filter(Game.creeps, (i) => i.memory.spawn == spawn.name);
		m.counts = {
			harvesters: _.filter(creeps, (i) => i.memory.role == 'harvester'),
			builders:   _.filter(creeps, (i) => i.memory.role == 'builder'),
			upgraders:  _.filter(creeps, (i) => i.memory.role == 'upgrader'),
			carriers:   _.filter(creeps, (i) => i.memory.role == 'carrier'),
			attackers:  _.filter(creeps, (i) => i.memory.role == 'attacker'),
			claimers:   _.filter(creeps, (i) => i.memory.role == 'claimer'),
			healers:    _.filter(creeps, (i) => i.memory.role == 'healer'),
		}

		m.limits = {
			harvesters: 0,
			builders:   0,
			upgraders:  0,
			carriers:   0,
			attackers:  0,
			claimers:   0,
			healers:    0,
		};
        
		const availableExtensions = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level];
		const aec = EXTENSION_ENERGY_CAPACITY[level] * availableExtensions;
		let isLevelOk = spawn.room.energyCapacityAvailable == SPAWN_ENERGY_CAPACITY + aec;
        if (!isLevelOk) {
			level--;
		}

		if (level == 1) {
			isLevelOk = false;
		}

		if (creeps.length == 0) {
			level = 1;
		}

		if (m.counts.harvesters.length == 0) {
			level = 1;
		}
		
		const sources = spawn.room.find(FIND_SOURCES);
		const sites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
		const allSites = Game.constructionSites;
		const structures = spawn.room.find(FIND_STRUCTURES);
		const containers = _.filter(structures, (i) => i.structureType == STRUCTURE_CONTAINER);
		const storage = spawn.room.storage;
		
		m.limits.harvesters += sources.length;

		if (storage) {
			m.limits.upgraders += parseInt(storage.store[RESOURCE_ENERGY] / 4000);
			if (m.limits.upgraders > 5) {
				m.limits.upgraders = 5;
			}
		} else {
			m.limits.upgraders += level;
		}
		
		if (_.filter(sites, (i) => i.structureType == STRUCTURE_EXTENSION).length > 0) {
			m.limits.builders += sources.length;
		}
		
		if (sites.length > 0) {
		    m.limits.builders++;
		}

		if (containers.length > 0) {
		    m.limits.carriers += sources.length;
		}

		const redFlag = _.filter(Game.flags, (i) => i.color == COLOR_RED)[0];
		if (redFlag) {
			m.limits.attackers++;
		}

		const greenFlag = _.filter(Game.flags, (i) => i.color == COLOR_GREEN)[0];
		if (greenFlag) {
			m.limits.healers++;
		}

		const purpleFlag = _.filter(Game.flags, (i) => i.color == COLOR_PURPLE)[0];
		if (purpleFlag) {
			m.limits.claimers++;
		}

		const yellowFlag = _.filter(Game.flags, (i) => i.color == COLOR_YELLOW)[0];
		if (yellowFlag) {
			m.limits.harvesters++;
		}

		const newSpawn = _.filter(allSites, (i) => i.structureType == STRUCTURE_SPAWN)[0];
		if (newSpawn) {
			m.limits.builders++;
		}
		
		tower.run(spawn);

		roles.run(spawn);
		
		spawner.run(spawn, level);

		visuals.run(spawn, level);

		construct.run(spawn);

		spawnNumber++;
	}
	
	// const linkFrom = Game.rooms['W3S9'].lookForAt('structure', 39, 44)[0];
	// const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2,
	// 	{filter: {structureType: STRUCTURE_LINK}})[0];
	// linkFrom.transferEnergy(linkTo);

	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
		}
	}
}