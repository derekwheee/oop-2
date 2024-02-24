const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('midi', {
    SET_TRANSPORT_LOCK: MiddleEnd.type.simple
});
