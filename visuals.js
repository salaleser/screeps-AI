var visuals = { run: function(spawn, level) {

	const flag = _.filter(Game.flags, (i) => i.color == COLOR_BROWN)[0];
	if (!flag) {
		return;
	}
	
    const x = flag.pos.x;
	const y = flag.pos.y + 2.1;

	const o = 0.6;
	let offset = 0;
	
	const whiteColor  = '#ffffff';
	const yellowColor = '#ffff00';
	const orangeColor = '#ffa500';
	const cyanColor   = '#00ffff';
	const greyColor   = '#808080';
	const redColor    = '#ff0000';
	const purpleColor = '#ff00ff';
	const greenColor  = '#00ff00';
	
    const levelStyle     = { align: 'center', opacity: 1, size: 1.0, color: whiteColor };
	const redAlertStyle  = { align: 'center', opacity: 1, size: 1.0, color: redColor };
	const harvesterStyle = { align: 'center', opacity: 1, size: 0.7, color: yellowColor };
	const builderStyle   = { align: 'center', opacity: 1, size: 0.7, color: orangeColor };
	const upgraderStyle  = { align: 'center', opacity: 1, size: 0.7, color: cyanColor };
	const carrierStyle   = { align: 'center', opacity: 1, size: 0.7, color: greyColor };
	const attackerStyle  = { align: 'center', opacity: 1, size: 0.7, color: redColor };
	const claimerStyle   = { align: 'center', opacity: 1, size: 0.7, color: purpleColor };
	const healerStyle    = { align: 'center', opacity: 1, size: 0.7, color: greenColor };
	
	// Actual room level
	const circleStyle = {
		fill: 'transparent',
		opacity: 1,
		radius: 0.5,
		stroke: 'white',
		strokeWidth: 0.07,
	};
	const lineStyle = {
		width: 0.08,
		color: 'white',
		opacity: 1,
		lineStyle: 'undefined',
	};

	spawn.room.visual.circle(x, y - 0.35, circleStyle);
	spawn.room.visual.line(x, y + 0.17, x, y + 4.4, lineStyle);
	if (spawn.room.controller.level == level) {
		spawn.room.visual.text(level, x, y + offset, levelStyle);
	} else {
		spawn.room.visual.text(level, x, y + offset, redAlertStyle);
	}
	offset += 0.7;
	
	// Room creeps count and limits
	const c = spawn.memory.counts;
	const l = spawn.memory.limits;

	const visual = spawn.room.visual;
	
	visual.text(c.harvesters.length + ' ' + l.harvesters, x, y + offset, harvesterStyle);
	offset += o;
	
	visual.text(c.builders.length + ' ' + l.builders, x, y + offset, builderStyle);
	offset += o;
	
	visual.text(c.upgraders.length + ' ' + l.upgraders, x, y + offset, upgraderStyle);
	offset += o;
	
    visual.text(c.carriers.length + ' ' + l.carriers, x, y + offset, carrierStyle);
	offset += o;
	
	visual.text(c.attackers.length + ' ' + l.attackers, x, y + offset, attackerStyle);
	offset += o;
	
	visual.text(c.claimers.length + ' ' + l.claimers, x, y + offset, claimerStyle);
	offset += o;
	
	visual.text(c.healers.length + ' ' + l.healers, x, y + offset, healerStyle);
	offset += o;
	
	const room = spawn.room;

	// Energy available
	const energyStyle = { align: 'center', opacity: 1, size: 0.7, color: '#00ff00' };
	const energy = parseInt(room.energyAvailable / room.energyCapacityAvailable * 100);
	visual.text(energy, spawn.pos.x, spawn.pos.y + 0.22, energyStyle);
	
	// Progress
	const controller = room.controller;
	const progressStyle = { align: 'left', opacity: 0.4, size: 0.9, color: '#00ff00' };
	const progress = parseInt(controller.progress / controller.progressTotal * 100) + "%";
	visual.text(progress, controller.pos.x + 0.8, controller.pos.y + 0.3, progressStyle);
	
	// Spawning creep
	if (spawn.spawning) {
		const spawningStyle = { align: 'left', opacity: 0.6, size: 0.6, color: '#ffffff' };
    	const creep = Game.creeps[spawn.spawning.name];
    	visual.text(creep.memory.role, creep.pos.x + 1, creep.pos.y, spawningStyle);
	}
	
// 	console.log(spawn.room.visual.getSize() + ' байт');

}};

module.exports = visuals;