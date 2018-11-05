var logger = require('logger');

var err;

var tower = { run: function(spawn) {

    const myStructures = spawn.room.find(FIND_MY_STRUCTURES);
    const structures = spawn.room.find(FIND_STRUCTURES);

    const towers = _.filter(myStructures, (i) => i.structureType == STRUCTURE_TOWER);
    for (let t in towers) {
        const tower = towers[t];
        
        let closestHostile;
		const hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);
        const attackerHostiles = _.filter(hostiles, (i) => i.getActiveBodyparts(ATTACK) > 0);
        const rangedAttackerHostiles = _.filter(hostiles, (i) => i.getActiveBodyparts(RANGED_ATTACK) > 0);
        if (attackerHostiles.length > 0) {
			closestHostile = spawn.pos.findClosestByRange(attackerHostiles)
		} else if (rangedAttackerHostiles.length > 0) {
			closestHostile = spawn.pos.findClosestByRange(rangedAttackerHostiles)
		} else {
			closestHostile = spawn.pos.findClosestByRange(hostiles)
		}
		if (closestHostile) {
			err = tower.attack(closestHostile);
			if (err != OK) {
    		    logger.error(err, spawn.name + '.tower.attack')
			}
			continue;
		}

		const creeps = tower.room.find(FIND_MY_CREEPS);
		const damagedCreeps = _.filter(creeps, (i) => i.hits < i.hitsMax);
		if (damagedCreeps.length > 0) {
			tower.heal(damagedCreeps[0]);
			return
		}

		if (tower != towers[0]) {
			// Only the first tower can be used for repairing
			return;
		}
		
		let target;
		const containers = _.filter(myStructures, (i) => i.structureType == STRUCTURE_CONTAINER);
		const brokenContainers = _.filter(containers, (i) => i.hits < i.hitsMax);
		const brokenStructures = _.filter(structures, (i) => i.hits < i.hitsMax);
		const hitsLimit = 23^spawn.room.controller.level + 10000;
		const filteredByHits = _.filter(brokenStructures, (i) => i.hits < hitsLimit);
 		const sortedByHits = filteredByHits.sort((a,b) => a.hits - b.hits);
		if (brokenContainers.length > 0) {
			target = brokenContainers[0];
		} else if (sortedByHits.length > 0) {
		    target = sortedByHits[0];
		}
		if (target) {
			err = tower.repair(target);
     		if (err != OK && err != ERR_NOT_ENOUGH_ENERGY) {
     		    logger.error(err, spawn.name + '.tower.repair')
     		}
		}
	}
	
}};

module.exports = tower;