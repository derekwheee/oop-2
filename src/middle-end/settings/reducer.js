const MiddleEnd = require('strange-middle-end');
const {
    SET_MIDI_INPUT,
    SET_MIDI_CHANNEL
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    midiInput: 2,
    midiChannel: 1
}, {
    [SET_MIDI_INPUT]: (s, { payload: midiInput }) => {

        s.midiInput = midiInput;
    },
    [SET_MIDI_CHANNEL]: (s, { payload: midiChannel }) => {

        s.midiChannel = midiChannel;
    }
});
