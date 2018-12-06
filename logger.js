var logger = { error: function(code, method, text) {
    
    let msg;
    switch(code) {
    case OK: // 0
        msg = 'OK';
        msg = 'The operation has been scheduled successfully.';
        break;
    case ERR_NOT_OWNER: // -1
        msg = 'ERR_NOT_OWNER';
        switch(method) {
            case 'spawnCreep':
                msg = 'You are not the owner of this spawn.';
                break;
        }
        break;
    case ERR_NO_PATH: // -2
        msg = 'ERR_NO_PATH';
        switch(method) {
            case 'moveTo':
                msg = 'No path to the target could be found.';
                break;
        }
        break;
    case ERR_NAME_EXISTS: // -3
        msg = 'ERR_NAME_EXISTS';
        switch(method) {
            case 'spawnCreep':
                msg = 'There is a creep with the same name already.';
                break;
        }
        break;
    case ERR_BUSY: // -4
        msg = 'ERR_BUSY';
        switch(method) {
            case 'spawnCreep':
                msg = 'The spawn is already in process of spawning another creep.';
                break;
            case 'harvest':
                msg = 'The creep is still being spawned.';
                break;
        }
        break;
    case ERR_NOT_FOUND: // -5
        msg = 'ERR_NOT_FOUND';
        break;
    case ERR_NOT_ENOUGH_ENERGY: // -6
        msg = 'ERR_NOT_ENOUGH_ENERGY';
        switch(method) {
            case 'harvest':
                msg = 'The target does not contain any harvestable energy or mineral.';
                break;
            case 'repair':
                msg = 'The tower does not have enough energy.';
                break;
            case 'spawnCreep':
                msg = 'The spawn and its extensions contain not enough energy to ' +
                    'create a creep with the given body.';
                break;
        }
        break;
    case ERR_INVALID_TARGET: // -7
        msg = 'ERR_INVALID_TARGET';
        switch(method) {
            case 'claimController':
                msg = 'The target is not a valid neutral controller object.';
                break;
            case 'attackController':
                msg = 'The target is not a valid owned or reserved controller object.';
                break;
            case 'createConstructionSite':
                msg = 'The structure cannot be placed at the specified location.';
                break;
        }
        break;
    case ERR_FULL: // -8
        msg = 'ERR_FULL';
        switch(method) {
            case 'createConstructionSite':
                msg = 'You have too many construction sites. The maximum number of ' +
                    'construction sites per player is 100.';
                break;
        }
        break;
    case ERR_NOT_IN_RANGE: // -9
        msg = 'ERR_NOT_IN_RANGE';
        break;
    case ERR_INVALID_ARGS: // -10
        msg = 'ERR_INVALID_ARGS';
        switch(method) {
            case 'createConstructionSite':
                msg = 'The location is incorrect.';
                break;
            case 'spawnCreep':
                msg = 'Body is not properly described or name was not provided.';
                break;
        }
        break;
    case ERR_TIRED: // -11
        msg = 'ERR_TIRED';
        switch(method) {
            case 'moveTo':
                msg = 'The fatigue indicator of the creep is non-zero.';
                break;
        }
        break;
    case ERR_NO_BODYPART: // -12
        msg = 'ERR_NO_BODYPART';
        break;
    case ERR_RCL_NOT_ENOUGH: // -14
        msg = 'ERR_RCL_NOT_ENOUGH';
        switch(method) {
            case 'createConstructionSite':
                msg = 'Room Controller Level insufficient.';
                break;
            case 'spawnCreep':
                msg = 'Your Room Controller level is insufficient to use this spawn.';
                break;
        }
        break;
    case ERR_GCL_NOT_ENOUGH: // -15
        msg = 'ERR_GCL_NOT_ENOUGH';
        switch(method) {
            case 'claimController':
                msg = 'Your Global Control Level is not enough.';
                break;
        }
        break;
    }

    console.log('[ERROR]', text + ': "' + msg + '" (' + code + ')');

}};

module.exports = logger;