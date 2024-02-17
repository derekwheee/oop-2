const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');
const Effects = require('../../../containers/Effects');

const internals = {};

module.exports = function HomepageContainer() {

    const m = useMiddleEnd();
    const audioContext = useSelector(m.selectors.synth.getContext);
    const synth = useSelector(m.selectors.synth.getSynth);
    const octave = useSelector(m.selectors.synth.getOctave);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    const handlePower = async () => {

        if (audioContext) {
            return;
        }

        await Tone.start();

        m.dispatch.synth.setContext(Tone);
    };

    return (
        <>
            <HomePage
                onPower={handlePower}
                isReady={!!audioContext}
                context={Tone}
                synth={synth}
                octave={octave}
                distortion={distortion}
                reverb={reverb}
                delayFeedback={delayFeedback}
                vibratoDepth={vibratoDepth}
            />
            <Synthesizer Tone={audioContext} />
            <Effects />
        </>
    );
};
