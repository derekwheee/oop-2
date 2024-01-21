const MiddleEnd = require('strange-middle-end');
const {
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_SYNTH,
    SET_SYNTH_OCTAVE
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setContext: internals.basicAction(SET_CONTEXT),
        setTransport: internals.basicAction(SET_TRANSPORT),
        setSynth: internals.basicAction(SET_SYNTH),
        setSynthOctave: internals.basicAction(SET_SYNTH_OCTAVE)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
