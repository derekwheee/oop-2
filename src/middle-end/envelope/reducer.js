const MiddleEnd = require('strange-middle-end');
const { clamp } = require('../../utils/math');
const {
    SET_ATTACK,
    SET_DECAY,
    SET_SUSTAIN,
    SET_RELEASE
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    attack: 0,
    decay: 0.333,
    sustain: 0.5,
    release: 0.75
}, {
    [SET_ATTACK]: (s, { payload: attack }) => {

        s.attack = clamp(Number(attack), 0, 1);
    },
    [SET_DECAY]: (s, { payload: decay }) => {

        s.decay = clamp(Number(decay), 0, 1);
    },
    [SET_SUSTAIN]: (s, { payload: sustain }) => {

        s.sustain = clamp(Number(sustain), 0, 1);
    },
    [SET_RELEASE]: (s, { payload: release }) => {

        s.release = clamp(Number(release), 0, 1);
    }
});
