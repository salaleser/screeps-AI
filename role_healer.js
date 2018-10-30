var err;

var role_healer = { run: function(spawn, creep) {
    
    const moveStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#fff',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };

	const healStyle = { visualizePathStyle: {
		fill: 'transparent',
		stroke: '#0f0',
		lineStyle: 'dashed',
		strokeWidth: 0.1,
		opacity: 0.4,
	} };
    
	const damagedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		filter: function(object) {
			return object.hits < object.hitsMax;
		}
	});
	if (damagedCreep) {
		creep.moveTo(damagedCreep, healStyle);
		if (creep.pos.isNearTo(damagedCreep)) {
			creep.heal(damagedCreep);
		} else {
			creep.rangedHeal(damagedCreep);
		}
		return;
	}
	
	for (let f in Game.flags) {
		let flag = Game.flags[f];
		if (flag.color == COLOR_GREEN) {
			creep.moveTo(flag, moveStyle);
		}
	}
	
}};

module.exports = role_healer;