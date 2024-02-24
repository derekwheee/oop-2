const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('settings', {
    SET_MIDI_INPUT: MiddleEnd.type.simple,
    SET_MIDI_CHANNEL: MiddleEnd.type.simple
});
