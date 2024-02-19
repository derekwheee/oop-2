const { OSCILLATOR_WAVEFORMS } = require('../../utils/constants');

exports.getWaveform = ({ osc1 }) => Object.values(OSCILLATOR_WAVEFORMS)[Math.round(osc1.waveform * Object.values(OSCILLATOR_WAVEFORMS).length)];

exports.getOctave = ({ osc1 }) => osc1.octave;

exports.getPitch = ({ osc1 }) => osc1.pitch;

exports.getVolume = ({ osc1 }) => osc1.volume;
