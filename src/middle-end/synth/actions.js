const MiddleEnd = require('strange-middle-end');
const {
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_SYNTH,
    SET_TYPE,
    SET_SYNTH_OCTAVE,
    SET_PITCH_SHIFT,
    SET_DISTORTION,
    SET_REVERB,
    SET_DELAY_TIME,
    SET_DELAY_FEEDBACK
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setContext: internals.basicAction(SET_CONTEXT),
        setTransport: internals.basicAction(SET_TRANSPORT),
        setSynth: internals.basicAction(SET_SYNTH),
        setType: internals.basicAction(SET_TYPE),
        setSynthOctave: internals.basicAction(SET_SYNTH_OCTAVE),
        setPitchShift: internals.basicAction(SET_PITCH_SHIFT),
        setDistortion: internals.basicAction(SET_DISTORTION),
        setReverb: internals.basicAction(SET_REVERB),
        setDelayTime: internals.basicAction(SET_DELAY_TIME),
        setDelayFeedback: internals.basicAction(SET_DELAY_FEEDBACK)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
