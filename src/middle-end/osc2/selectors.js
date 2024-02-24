const { scale } = require('../../utils/math');
const { OSCILLATOR_WAVEFORMS } = require('../../utils/constants');

exports.getWaveform = ({ osc2 }) => [osc2.waveform, Object.values(OSCILLATOR_WAVEFORMS)[Math.round(scale(osc2.waveform, [0, 1], [0, Object.values(OSCILLATOR_WAVEFORMS).length - 1]))]];

exports.getOctave = ({ osc2 }) => [osc2.octave, Math.round(scale(osc2.octave, [0, 1], [-3, 3]))];

exports.getPitch = ({ osc2 }) => [osc2.pitch, Math.round(scale(osc2.pitch, [0, 1], [-12, 12]))];

exports.getVolume = ({ osc2 }) => [osc2.volume, Math.round(scale(osc2.volume, [0, 1], [-12, 12]))];
