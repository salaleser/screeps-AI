var logger = { error: function(code, text) {
    
    let msg;
    switch (code) {
    case OK: // 0
        msg = 'The operation has been scheduled successfully.';
        break;
    case ERR_NOT_OWNER: // -1
        msg = 'You are not the owner of this spawn.';
        break;
    case ERR_NO_PATH: // -2
        msg = 'ERR_NO_PATH';
        msg = 'No path to the target could be found.'; // moveTo()
        break;
    case ERR_NAME_EXISTS: // -3
        msg = 'There is a creep with the same name already.';
        break;
    case ERR_BUSY: // -4
        msg = 'The spawn is already in process of spawning another creep';
        break;
    case ERR_NOT_FOUND: // -5
        msg = 'ERR_NOT_FOUND';
        break;
    case ERR_NOT_ENOUGH_ENERGY: // -6
        msg = 'The spawn and its extensions contain not enough energy to ' +
            'create a creep with the given body.';
        msg = 'The tower does not have enough energy.' // repair()
        break;
    case ERR_INVALID_TARGET: // -7
        msg = 'The target is not a valid owned or reserved controller object.'; // attackController()
        msg = 'The structure cannot be placed at the specified location.';
        break;
    case ERR_FULL: // -8
        msg = 'You have too many construction sites. The maximum number of ' +
            'construction sites per player is 100.';  // createConstructionSite()
        // msg = 'ERR_FULL';
        break;
    case ERR_NOT_IN_RANGE: // -9
        msg = 'ERR_NOT_IN_RANGE';
        break;
    case ERR_INVALID_ARGS: // -10
        msg = 'Body is not properly described or name was not provided';
        msg = 'The location is incorrect.'; // createConstructionSite()
        break;
    case ERR_TIRED: // -11
        msg = 'ERR_TIRED';
        msg = 'The fatigue indicator of the creep is non-zero.'; // moveTo()
        break;
    case ERR_NO_BODYPART: // -12
        msg = 'ERR_NO_BODYPART';
        break;
    case ERR_RCL_NOT_ENOUGH: // -14
        msg = 'Your Room Controller level is insufficient to use this spawn.';
        msg = 'Room Controller Level insufficient.'; // createConstructionSite()
        break;
    case ERR_GCL_NOT_ENOUGH: // -15
        msg = 'Your Global Control Level is not enough.'; // claimController()
        break;
    }

    console.log('[ERROR]', text + ': "' + msg + '" (' + code + ')');

}};

module.exports = logger;