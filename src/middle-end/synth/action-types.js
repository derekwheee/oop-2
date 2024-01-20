const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('synths', {
    SET_SYNTH_OCTAVE: MiddleEnd.type.simple
});
