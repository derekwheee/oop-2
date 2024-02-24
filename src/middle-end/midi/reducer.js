const MiddleEnd = require('strange-middle-end');
const { TRANSPORT_LOCK } = require('../../utils/constants');
const {
    SET_TRANSPORT_LOCK
} = require('./action-types');

module.exports = MiddleEnd.createReducer({ mutable: true }, {
    transportLock: TRANSPORT_LOCK.UNLOCKED
}, {
    [SET_TRANSPORT_LOCK]: (s, { payload: transportLock }) => {

        s.transportLock = transportLock;
    }
});
