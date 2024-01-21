const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('synth', {
    SET_CONTEXT: MiddleEnd.type.simple,
    SET_TRANSPORT: MiddleEnd.type.simple,
    SET_SYNTH: MiddleEnd.type.simple,
    SET_SYNTH_OCTAVE: MiddleEnd.type.simple
});
