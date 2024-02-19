const MiddleEnd = require('strange-middle-end');
const {
    SET_WAVEFORM,
    SET_OCTAVE,
    SET_PITCH,
    SET_VOLUME
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setWaveform: internals.basicAction(SET_WAVEFORM),
        setOctave: internals.basicAction(SET_OCTAVE),
        setPitch: internals.basicAction(SET_PITCH),
        setVolume: internals.basicAction(SET_VOLUME)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
