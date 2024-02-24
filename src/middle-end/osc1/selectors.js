const { scale } = require('../../utils/math');
const { OSCILLATOR_WAVEFORMS } = require('../../utils/constants');

exports.getWaveform = ({ osc1 }) => [osc1.waveform, Object.values(OSCILLATOR_WAVEFORMS)[Math.round(scale(osc1.waveform, [0, 1], [0, Object.values(OSCILLATOR_WAVEFORMS).length - 1]))]];

exports.getOctave = ({ osc1 }) => [osc1.octave, Math.round(scale(osc1.octave, [0, 1], [-3, 3]))];

exports.getPitch = ({ osc1 }) => [osc1.pitch, Math.round(scale(osc1.pitch, [0, 1], [-12, 12]))];

exports.getVolume = ({ osc1 }) => [osc1.volume, Math.round(scale(osc1.volume, [0, 1], [-12, 12]))];
