const { OSCILLATOR_WAVEFORMS } = require('../../utils/constants');

const internals = {};

exports.getWaveform = ({ osc1 }) => Object.values(OSCILLATOR_WAVEFORMS)[Math.round(osc1.waveform * Object.values(OSCILLATOR_WAVEFORMS).length)];

exports.getOctave = ({ osc1 }) => Math.round(internals.scale(osc1.octave, [0, 1], [-3, 3]));

exports.getPitch = ({ osc1 }) => Math.round(internals.scale(osc1.pitch, [0, 1], [-7, 7]));

exports.getVolume = ({ osc1 }) => Math.round(internals.scale(osc1.volume, [0, 1], [-6, 6]));

exports.getRawWaveform = ({ osc1 }) => osc1.waveform;

exports.getRawOctave = ({ osc1 }) => osc1.octave;

exports.getRawPitch = ({ osc1 }) => osc1.pitch;

exports.getRawVolume = ({ osc1 }) => osc1.volume;

internals.scale = (inputY, yRange, xRange) => {

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;

    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;

    return outputX;
};
