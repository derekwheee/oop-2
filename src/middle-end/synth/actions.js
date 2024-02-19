const MiddleEnd = require('strange-middle-end');
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

const internals = {};

module.exports = (m) => {

    return {
        setMidiDevice: internals.basicAction(SET_MIDI_DEVICE),
        setContext: internals.basicAction(SET_CONTEXT),
        setTransport: internals.basicAction(SET_TRANSPORT),
        setVoice1: internals.basicAction(SET_VOICE_1),
        setVoice2: internals.basicAction(SET_VOICE_2),
        setDistortion: internals.basicAction(SET_DISTORTION),
        setReverb: internals.basicAction(SET_REVERB),
        setDelayTime: internals.basicAction(SET_DELAY_TIME),
        setDelayFeedback: internals.basicAction(SET_DELAY_FEEDBACK),
        setVibratoFrequency: internals.basicAction(SET_VIBRATO_FREQUENCY),
        setVibratoDepth: internals.basicAction(SET_VIBRATO_DEPTH)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
