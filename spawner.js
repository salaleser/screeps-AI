var logger = require('logger');

var err;

var spawner = { run: function(spawn, level) {
    
    if (Game.time % 10 != 0) {
        return;
    }

    var bodies = {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        builder:   [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader:  [WORK, CARRY, CARRY, MOVE, MOVE],
        carrier:   [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        attacker:  [ATTACK, MOVE],
        claimer:   [CLAIM, MOVE],
        healer:    [HEAL, MOVE],
    };

    switch (level) {
    case 2: // 550
        bodies.harvester = [
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY,
            MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK,
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY,
            MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.healer = [
            MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 3: // 800
        bodies.harvester = [
            WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.healer = [
            MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 4: // 1300
        bodies.harvester = [
            WORK, WORK, WORK,
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.attacker = [
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH,
            ATTACK, ATTACK, ATTACK, ATTACK,
            ATTACK, ATTACK, ATTACK, ATTACK,
            MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE,
        ];
        bodies.healer = [
            MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 5: // 1800
        bodies.harvester = [
            WORK, WORK, WORK,
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.attacker = [
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE,
        ];
        bodies.healer = [
            MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 6: //даже не задумывался еще
        bodies.harvester = [
            WORK, WORK, WORK,
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.attacker = [
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 7: //страшно подумать даже
        bodies.harvester = [
            WORK, WORK, WORK,
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.attacker = [
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    case 8: //это недостижимый уровень, поэтому даже не буду заморачиваться
        bodies.harvester = [
            WORK, WORK, WORK,
            WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.builder = [
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.upgrader = [
            WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.carrier = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ];
        bodies.attacker = [
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            HEAL,
        ];
        break;
    }
    
    // FIXME
    if (spawn.memory.counts.harvesters.length == 0) {
        let body = [ WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ];
        err = spawn.spawnCreep(body, Game.time, { dryRun: true });
        
        if (err == ERR_NOT_ENOUGH_ENERGY) {
            body = [ WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE ];
            err = spawn.spawnCreep(body, Game.time, { dryRun: true });
            
            if (err == ERR_NOT_ENOUGH_ENERGY) {
                body = [ WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE ];
                err = spawn.spawnCreep(body, Game.time, { dryRun: true });
                
                if (err == ERR_NOT_ENOUGH_ENERGY) {
                    body = [ WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE ];
                    err = spawn.spawnCreep(body, Game.time, { dryRun: true });
                    
                    if (err == ERR_NOT_ENOUGH_ENERGY) {
                        body = [ WORK, WORK, CARRY, MOVE ];
                        err = spawn.spawnCreep(body, Game.time, { dryRun: true });
                    }
                }
            }
        }

        bodies.harvester = body;
    }
    
    let role;
    let body;
    let c = spawn.memory.counts;
    let l = spawn.memory.limits;
    if (c.harvesters.length < l.harvesters) {
        role = 'harvester';
        body = bodies.harvester;
    } else if (c.builders.length < l.builders) {
        role = 'builder';
        body = bodies.builder;
    } else if (c.upgraders.length < l.upgraders) {
        role = 'upgrader';
        body = bodies.upgrader;
    } else if (c.carriers.length < l.carriers) {
        role = 'carrier';
        body = bodies.carrier;
    } else if (c.attackers.length < l.attackers) {
        role = 'attacker';
        body = bodies.attacker;
    } else if (c.claimers.length < l.claimers) {
        role = 'claimer';
        body = bodies.claimer;
    } else if (c.claimers.length < l.claimers) {
        role = 'healer';
        body = bodies.healer;
    } else {
        return;
    }
    
    if (role == 'harvester') {
        const sources    = spawn.room.find(FIND_SOURCES);
        const minerals   = spawn.room.find(FIND_MINERALS);
        const structures = spawn.room.find(FIND_STRUCTURES);
        const extractors = _.filter(structures, (i) => i.structureType == STRUCTURE_EXTRACTOR);

        const harvesters     = _.filter(Game.creeps, (i) => i.memory.spawn == spawn.name && i.memory.role == 'harvester');
        const isSource1Free  = _.filter(harvesters, (i) => i.memory.source == sources[0].id).length == 0;
        let isSource2Free = false;
        if (sources.length > 1) {
            isSource2Free  = _.filter(harvesters, (i) => i.memory.source == sources[1].id).length == 0;
        }
        const isMineral1Free = _.filter(harvesters, (i) => i.memory.source == minerals[0].id).length == 0;
        
        let sourceID = sources[0].id;
        if (isSource1Free) {
            sourceID = sources[0].id;
        } else if (isSource2Free) {
            sourceID = sources[1].id;
        } else if (isMineral1Free && extractors.length > 0) {
            sourceID = minerals[0].id;
        }

        opts = { memory: {
            role:   role,
            spawn:  spawn.name,
            source: sourceID,
        } };
    } else {
        opts = { memory: {
            role:  role,
            spawn: spawn.name,
        } };
    }
    
    err = spawn.spawnCreep(body, Game.time, opts);
    if (err == ERR_BUSY || err == ERR_NOT_ENOUGH_ENERGY || err == ERR_NAME_EXISTS) {
        return;
    } else {
        logger.error(err, 'spawnCreep', spawn.name + '.spawnCreep(' + role + ')');
    }

}};

module.exports = spawner;