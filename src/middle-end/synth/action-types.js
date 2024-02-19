const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('synth', {
    SET_CONTEXT: MiddleEnd.type.simple,
    SET_TRANSPORT: MiddleEnd.type.simple,
    SET_VOICE_1: MiddleEnd.type.simple,
    SET_VOICE_2: MiddleEnd.type.simple,
    SET_DISTORTION: MiddleEnd.type.simple,
    SET_REVERB: MiddleEnd.type.simple,
    SET_DELAY_TIME: MiddleEnd.type.simple,
    SET_DELAY_FEEDBACK: MiddleEnd.type.simple,
    SET_VIBRATO_FREQUENCY: MiddleEnd.type.simple,
    SET_VIBRATO_DEPTH: MiddleEnd.type.simple
});
