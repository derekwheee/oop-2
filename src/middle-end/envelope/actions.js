const MiddleEnd = require('strange-middle-end');
const {
    SET_ATTACK,
    SET_DECAY,
    SET_SUSTAIN,
    SET_RELEASE
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setAttack: internals.basicAction(SET_ATTACK),
        setDecay: internals.basicAction(SET_DECAY),
        setSustain: internals.basicAction(SET_SUSTAIN),
        setRelease: internals.basicAction(SET_RELEASE)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
