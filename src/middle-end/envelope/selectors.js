const { scale } = require('../../utils/math');

exports.getAttack = ({ envelope }) => [envelope.attack, Math.round(scale(envelope.attack, [0, 1], [0, 1]) * 10) / 10];

exports.getDecay = ({ envelope }) => [envelope.decay, Math.round(scale(envelope.decay, [0, 1], [0, 1]) * 10) / 10];

exports.getSustain = ({ envelope }) => [envelope.sustain, Math.round(scale(envelope.sustain, [0, 1], [0, 1]) * 10) / 10];

exports.getRelease = ({ envelope }) => [envelope.release, Math.round(scale(envelope.release, [0, 1], [0, 1]) * 10) / 10];
