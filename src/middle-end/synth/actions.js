const MiddleEnd = require('strange-middle-end');
const { SET_SYNTH_OCTAVE } = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setSynthOctave: MiddleEnd.createAction(SET_SYNTH_OCTAVE, (octave) => octave)
    };
};
