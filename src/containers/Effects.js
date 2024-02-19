const { useEffect, useMemo } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { REVERB_MIN_DECAY } = require('../utils/constants');

module.exports = function Synthesizer() {

    const m = useMiddleEnd();
    const Tone = useSelector(m.selectors.synth.getContext);
    const voice1 = useSelector(m.selectors.synth.getVoice1);
    const voice2 = useSelector(m.selectors.synth.getVoice2);
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

        if (voice1 && distortionFx) {
            voice1.connect(distortionFx);
            voice1.connect(reverbFx);
            voice1.connect(delayFx);
            voice1.connect(vibratoFx);
        }

        if (voice2 && distortionFx) {
            voice2.connect(distortionFx);
            voice2.connect(reverbFx);
            voice2.connect(delayFx);
            voice2.connect(vibratoFx);
        }
    }, [m, voice1, voice2, distortionFx, reverbFx, delayFx, vibratoFx]);

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
