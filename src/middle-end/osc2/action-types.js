const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('osc2', {
    SET_WAVEFORM: MiddleEnd.type.simple,
    SET_OCTAVE: MiddleEnd.type.simple,
    SET_PITCH: MiddleEnd.type.simple,
    SET_VOLUME: MiddleEnd.type.simple
});
