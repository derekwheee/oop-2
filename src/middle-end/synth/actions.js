const MiddleEnd = require('strange-middle-end');
const {
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_SYNTH,
    SET_SYNTH_OCTAVE,
    SET_PITCH_SHIFT,
    SET_DISTORTION,
    SET_REVERB
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setContext: internals.basicAction(SET_CONTEXT),
        setTransport: internals.basicAction(SET_TRANSPORT),
        setSynth: internals.basicAction(SET_SYNTH),
        setSynthOctave: internals.basicAction(SET_SYNTH_OCTAVE),
        setPitchShift: internals.basicAction(SET_PITCH_SHIFT),
        setDistortion: internals.basicAction(SET_DISTORTION),
        setReverb: internals.basicAction(SET_REVERB)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
