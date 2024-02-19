exports.getMidiDevice = ({ synth }) => synth.midiDevice;

exports.getContext = ({ synth }) => synth.context;

exports.getTransport = ({ synth }) => synth.transport;

exports.getVoice1 = ({ synth }) => synth.voice1;

exports.getVoice2 = ({ synth }) => synth.voice2;

exports.getDistortion = ({ synth }) => synth.distortion;

exports.getReverb = ({ synth }) => synth.reverb;

exports.getDelayTime = ({ synth }) => synth.delayTime;

exports.getDelayFeedback = ({ synth }) => synth.delayFeedback;

exports.getVibratoFrequency = ({ synth }) => synth.vibratoFrequency;

exports.getVibratoDepth = ({ synth }) => synth.vibratoDepth;
