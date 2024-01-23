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
    const delayTime = useSelector(m.selectors.synth.getDelayTime);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoFrequency = useSelector(m.selectors.synth.getVibratoFrequency);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    const distortionFx = useMemo(() => (Tone ? new Tone.Distortion(0).toDestination() : null), [Tone]);
    const reverbFx = useMemo(() => (Tone ? new Tone.Reverb(REVERB_MIN_DECAY).toDestination() : null), [Tone]);
    const delayFx = useMemo(() => (Tone ? new Tone.FeedbackDelay(0, 0).toDestination() : null), [Tone]);
    const vibratoFx = useMemo(() => (Tone ? new Tone.Vibrato(0, 0).toDestination() : null), [Tone]);

    useEffect(() => {

        if (synth && distortionFx) {
            synth.connect(distortionFx);
            synth.connect(reverbFx);
            synth.connect(delayFx);
            synth.connect(vibratoFx);
        }
    }, [m, synth, distortionFx, reverbFx, delayFx, vibratoFx]);

    useEffect(() => {

        if (distortionFx) {
            distortionFx.distortion = distortion;
        }

        if (reverbFx) {
            reverbFx.decay = reverb;
        }

        if (delayFx) {
            delayFx.set({
                delayTime,
                feedback: delayFeedback
            });
        }

        if (vibratoFx) {
            vibratoFx.set({
                frequency: vibratoFrequency,
                depth: vibratoDepth
            });
        }
    }, [
        distortionFx,
        distortion,
        reverbFx,
        reverb,
        delayFx,
        delayTime,
        delayFeedback,
        vibratoFx,
        vibratoFrequency,
        vibratoDepth
    ]);

    return null;
};
