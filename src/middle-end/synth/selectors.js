exports.getContext = ({ synth }) => synth.context;

exports.getTransport = ({ synth }) => synth.transport;

exports.getSynth = ({ synth }) => synth.synth;

exports.getType = ({ synth }) => synth.type;

exports.getOctave = ({ synth }) => synth.octave;

exports.getPitchShift = ({ synth }) => synth.pitchShift;

exports.getDistortion = ({ synth }) => synth.distortion;

exports.getReverb = ({ synth }) => synth.reverb;

exports.getDelayTime = ({ synth }) => synth.delayTime;

exports.getDelayFeedback = ({ synth }) => synth.delayFeedback;
