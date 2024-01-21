const MiddleEnd = require('strange-middle-end');
const { SYNTH_TRANSPORTS, REVERB_MIN_DECAY } = require('../../utils/constants');
const {
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_SYNTH,
    SET_SYNTH_OCTAVE,
    SET_PITCH_SHIFT,
    SET_DISTORTION,
    SET_REVERB
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    synth: null,
    transport: SYNTH_TRANSPORTS.KEYBOARD,
    octave: 2,
    pitchShift: 0,
    distortion: 0,
    reverb: REVERB_MIN_DECAY
}, {
    [SET_CONTEXT]: (s, { payload: context }) => {

        s.context = context;
    },
    [SET_TRANSPORT]: (s, { payload: transport }) => {

        s.transport = transport;
    },
    [SET_SYNTH]: (s, { payload: synth }) => {

        s.synth = synth;
    },
    [SET_SYNTH_OCTAVE]: (s, { payload: octave }) => {

        s.octave = octave;
    },
    [SET_PITCH_SHIFT]: (s, { payload: pitchShift }) => {

        s.pitchShift = pitchShift;
    },
    [SET_DISTORTION]: (s, { payload: distortion }) => {

        s.distortion = distortion;
    },
    [SET_REVERB]: (s, { payload: reverb }) => {

        s.reverb = Number(reverb) || REVERB_MIN_DECAY;
    }
});
