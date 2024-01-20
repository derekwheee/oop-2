const MiddleEnd = require('strange-middle-end');
const { SET_SYNTH_OCTAVE } = require('./action-types');
const { SYNTH_TRANSPORTS } = require('../../utils/constants');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    transport: SYNTH_TRANSPORTS.KEYBOARD,
    octave: 2
}, {
    [SET_SYNTH_OCTAVE]: (s, { payload: octave }) => {

        s.octave = octave;
    }
});
