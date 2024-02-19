const MiddleEnd = require('strange-middle-end');
const { clamp } = require('../../utils/math');
const { SYNTH_TRANSPORTS, REVERB_MIN_DECAY, SYNTH_TYPES } = require('../../utils/constants');
const {
    SET_MIDI_DEVICE,
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_VOICE_1,
    SET_VOICE_2,
    SET_DISTORTION,
    SET_REVERB,
    SET_DELAY_TIME,
    SET_DELAY_FEEDBACK,
    SET_VIBRATO_FREQUENCY,
    SET_VIBRATO_DEPTH
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    midiDevice: null,
    voice1: null,
    voice2: null,
    type: Object.values(SYNTH_TYPES)[0],
    transport: SYNTH_TRANSPORTS.KEYBOARD,
    octave: 2,
    pitchShift: 0,
    distortion: 0,
    reverb: REVERB_MIN_DECAY,
    delayTime: 0,
    delayFeedback: 0,
    vibratoFrequency: 0,
    vibratoDepth: 0
}, {
    [SET_MIDI_DEVICE]: (s, { payload: midiDevice }) => {

        s.midiDevice = midiDevice;
    },
    [SET_CONTEXT]: (s, { payload: context }) => {

        s.context = context;
    },
    [SET_TRANSPORT]: (s, { payload: transport }) => {

        s.transport = transport;
    },
    [SET_VOICE_1]: (s, { payload: voice1 }) => {

        s.voice1 = voice1;
    },
    [SET_VOICE_2]: (s, { payload: voice2 }) => {

        s.voice2 = voice2;
    },
    [SET_DISTORTION]: (s, { payload: distortion }) => {

        s.distortion = clamp(Number(distortion), 0, 1);
    },
    [SET_REVERB]: (s, { payload: reverb }) => {

        s.reverb = clamp(Number(reverb), REVERB_MIN_DECAY, 1);
    },
    [SET_DELAY_TIME]: (s, { payload: delayTime }) => {

        s.delayTime = delayTime;
    },
    [SET_DELAY_FEEDBACK]: (s, { payload: delayFeedback }) => {

        s.delayFeedback = clamp(Number(delayFeedback), 0, 1);
    },
    [SET_VIBRATO_FREQUENCY]: (s, { payload: vibratoFrequency }) => {

        s.vibratoFrequency = vibratoFrequency;
    },
    [SET_VIBRATO_DEPTH]: (s, { payload: vibratoDepth }) => {

        s.vibratoDepth = clamp(Number(vibratoDepth), 0, 1);
    }
});
