const MiddleEnd = require('strange-middle-end');
const { clamp } = require('../../utils/math');
const {
    SET_WAVEFORM,
    SET_OCTAVE,
    SET_PITCH,
    SET_VOLUME
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    waveform: 0.333,
    octave: 0.333,
    pitch: 0.8,
    volume: 0.75
}, {
    [SET_WAVEFORM]: (s, { payload: waveform }) => {

        s.waveform = clamp(Number(waveform), 0, 1);
    },
    [SET_OCTAVE]: (s, { payload: octave }) => {

        s.octave = clamp(Number(octave), 0, 1);
    },
    [SET_PITCH]: (s, { payload: pitch }) => {

        s.pitch = clamp(Number(pitch), 0, 1);
    },
    [SET_VOLUME]: (s, { payload: volume }) => {

        s.volume = clamp(Number(volume), 0, 1);
    }
});
