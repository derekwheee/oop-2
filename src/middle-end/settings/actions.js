const MiddleEnd = require('strange-middle-end');
const {
    SET_MIDI_INPUT,
    SET_MIDI_CHANNEL
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setMidiInput: internals.basicAction(SET_MIDI_INPUT),
        setMidiChannel: internals.basicAction(SET_MIDI_CHANNEL)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
