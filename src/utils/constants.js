const Tone = require('tone');

exports.SYNTH_TYPES = {
    AM: 'am',
    FM: 'fm',
    MEMBRANE: 'membrane'
};

exports.SYNTH_TRANSPORTS = {
    KEYBOARD: 'keyboard'
};

exports.REVERB_MIN_DECAY = 0.001;

exports.SYNTH_CONFIGS = {
    [exports.SYNTH_TYPES.AM]: {
        synth: Tone.AMSynth,
        isPoly: true
    },
    [exports.SYNTH_TYPES.FM]: {
        synth: Tone.FMSynth,
        isPoly: true
    },
    [exports.SYNTH_TYPES.MEMBRANE]: {
        synth: Tone.MembraneSynth,
        isPoly: false
    }
};
