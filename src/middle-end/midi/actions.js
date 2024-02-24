const MiddleEnd = require('strange-middle-end');
const {
    SET_TRANSPORT_LOCK
} = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        setTransportLock: internals.basicAction(SET_TRANSPORT_LOCK)
    };
};

internals.basicAction = (type) => MiddleEnd.createAction(type, (payload) => payload);
