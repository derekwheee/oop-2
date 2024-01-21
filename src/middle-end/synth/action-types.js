const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('synth', {
    SET_CONTEXT: MiddleEnd.type.simple,
    SET_TRANSPORT: MiddleEnd.type.simple,
    SET_SYNTH: MiddleEnd.type.simple,
    SET_SYNTH_OCTAVE: MiddleEnd.type.simple,
    SET_PITCH_SHIFT: MiddleEnd.type.simple,
    SET_DISTORTION: MiddleEnd.type.simple,
    SET_REVERB: MiddleEnd.type.simple
});
