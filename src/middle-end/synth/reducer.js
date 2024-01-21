const MiddleEnd = require('strange-middle-end');
const { SYNTH_TRANSPORTS } = require('../../utils/constants');
const {
    SET_CONTEXT,
    SET_TRANSPORT,
    SET_SYNTH,
    SET_SYNTH_OCTAVE
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    synth: null,
    transport: SYNTH_TRANSPORTS.KEYBOARD,
    octave: 2
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
    }
});
