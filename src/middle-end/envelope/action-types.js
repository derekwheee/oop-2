const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('envelope', {
    SET_ATTACK: MiddleEnd.type.simple,
    SET_DECAY: MiddleEnd.type.simple,
    SET_SUSTAIN: MiddleEnd.type.simple,
    SET_RELEASE: MiddleEnd.type.simple
});
