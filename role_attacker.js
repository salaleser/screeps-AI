var err;

var role_attacker = { run: function(spawn, creep) {
    
    const moveStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#fff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };

	const attackStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#f00',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
    
	const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (target) {
	    err = creep.attack(target);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(target, attackStyle);
		}
		return;
	}

	if (creep.hits < creep.hitsMax) {
		for (let b in creep.body) {
			let body = creep.body[b];
			if (body.type == HEAL) {
				creep.heal(creep);
				return;
			}
		}
	}

	const damagedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		filter: function(object) {
			return object.hits < object.hitsMax;
		}
	});
	if (damagedCreep) {
		creep.moveTo(damagedCreep);
		if (creep.pos.isNearTo(damagedCreep)) {
			creep.heal(damagedCreep);
		} else {
			creep.rangedHeal(damagedCreep);
		}
		return;
	}
	
	for (let f in Game.flags) {
		let flag = Game.flags[f];
		if (flag.color == COLOR_RED) {
			creep.moveTo(flag, moveStyle);
		}
	}
	
}};

module.exports = role_attacker;