const { useEffect, useMemo } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { REVERB_MIN_DECAY } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer() {

    const m = useMiddleEnd();
    const Tone = useSelector(m.selectors.synth.getContext);
    const synth = useSelector(m.selectors.synth.getSynth);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);

    const distortionFx = useMemo(() => (Tone ? new Tone.Distortion(0).toDestination() : null), [Tone]);
    const reverbFx = useMemo(() => (Tone ? new Tone.Reverb(REVERB_MIN_DECAY).toDestination() : null), [Tone]);

    useEffect(() => {

        if (synth && distortionFx) {
            synth.connect(distortionFx);
            synth.connect(reverbFx);
        }
    }, [m, synth, distortionFx, reverbFx]);

    useEffect(() => {

        if (distortionFx) {
            distortionFx.distortion = distortion;
        }

        if (reverbFx) {
            reverbFx.decay = reverb;
        }
    }, [distortionFx, distortion, reverbFx, reverb]);

    return null;
};
