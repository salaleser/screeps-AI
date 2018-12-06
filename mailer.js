// mailer sends reports by email
var mailer = { run: function(spawn) {

	if (Game.time % 1000 != 0) {
        return;
    }
    
    const c     = spawn.memory.counts;
	const l     = spawn.memory.limits;
	const room  = spawn.room;
	const level = room.controller.level;
    
    let message = spawn.name + ' [' + level + '] (' + room.name + ')';
    
    message += '\nharvesters: ' + c.harvesters.length + '/' + l.harvesters;
    message += '\nbuilders: '   + c.builders.length   + '/' + l.builders;
    message += '\nupgraders: '  + c.upgraders.length  + '/' + l.upgraders;
    message += '\ncarriers: '   + c.carriers.length   + '/' + l.carriers;
    message += '\nattackers: '  + c.attackers.length  + '/' + l.attackers;
    message += '\nclaimers: '   + c.claimers.length   + '/' + l.claimers;
    message += '\nhealers: '    + c.healers.length    + '/' + l.healers;
    
    message += '\nEnergy available: ';
    const energyAvailable = room.energyAvailable;
    if (energyAvailable < 10000) {
        message += energyAvailable;
    } else {
        message += _.round(energyAvailable / 1000, 1) + 'K';
    }
    const pct = energyAvailable / room.energyCapacityAvailable * 100;
    message += ' (' + parseInt(pct) + '%)';
    
    const storage = room.storage;
    if (storage) {
        message += '\nStorage energy/minerals: ';
        const energy = storage.store[RESOURCE_ENERGY];
        if (energy < 10000) {
            message += energy + '/';
        } else {
            message += _.round(energy / 1000, 1) + 'K/';
        }
        const minerals = _.sum(storage.store);
        if (minerals < 10000) {
            message += minerals;
        } else {
            message += _.round(minerals / 1000, 1) + 'K';
        }
        const pct = (energy + minerals) / storage.storeCapacity * 100;
        message += ' (' + parseInt(pct) + '%)';
    } else {
        message += '\nStorage doesn\'t exist';
    }
    
    Game.notify(message, 120);

}};

module.exports = mailer;