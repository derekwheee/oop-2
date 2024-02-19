const MiddleEnd = require('strange-middle-end');
const {
    SET_WAVEFORM,
    SET_OCTAVE,
    SET_PITCH,
    SET_VOLUME
} = require('./action-types');

const internals = {};

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    waveform: 0,
    octave: 0.333,
    pitch: 0.5,
    volume: 1
}, {
    [SET_WAVEFORM]: (s, { payload: waveform }) => {

        s.waveform = internals.clamp(Number(waveform), 0, 1);
    },
    [SET_OCTAVE]: (s, { payload: octave }) => {

        s.octave = internals.clamp(Number(octave), 0, 1);
    },
    [SET_PITCH]: (s, { payload: pitch }) => {

        s.pitch = internals.clamp(Number(pitch), 0, 1);
    },
    [SET_VOLUME]: (s, { payload: volume }) => {

        s.volume = internals.clamp(Number(volume), 0, 1);
    }
});

internals.clamp = (num, min, max) => Math.min(Math.max(num, min), max);