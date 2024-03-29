const Tone = require('tone');

exports.SYNTH_TYPES = {
    MONO: 'mono',
    AM: 'am',
    FM: 'fm',
    DUO: 'duo',
    // NOISE: 'noise', // TODO: Figure out why this one doesn't work
    PLUCK: 'pluck',
    MEMBRANE: 'membrane',
    METAL: 'metal'
};

exports.SYNTH_TRANSPORTS = {
    KEYBOARD: 'keyboard'
};

exports.REVERB_MIN_DECAY = 0.001;

exports.SYNTH_CONFIGS = {
    [exports.SYNTH_TYPES.MONO]: {
        synth: Tone.MonoSynth,
        isPoly: false
    },
    [exports.SYNTH_TYPES.AM]: {
        synth: Tone.AMSynth,
        isPoly: true
    },
    [exports.SYNTH_TYPES.FM]: {
        synth: Tone.FMSynth,
        isPoly: true
    },
    [exports.SYNTH_TYPES.DUO]: {
        synth: Tone.DuoSynth,
        isPoly: false
    },
    [exports.SYNTH_TYPES.PLUCK]: {
        synth: Tone.PluckSynth,
        isPoly: false
    },
    [exports.SYNTH_TYPES.NOISE]: {
        synth: Tone.NoiseSynth,
        isPoly: false
    },
    [exports.SYNTH_TYPES.METAL]: {
        synth: Tone.MetalSynth,
        isPoly: false
    },
    [exports.SYNTH_TYPES.MEMBRANE]: {
        synth: Tone.MembraneSynth,
        isPoly: false
    }
};
