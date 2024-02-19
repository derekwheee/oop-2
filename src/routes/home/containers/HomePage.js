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

    const osc1 = {
        waveform: useSelector(m.selectors.osc1.getWaveform),
        octave: useSelector(m.selectors.osc1.getOctave),
        pitch: useSelector(m.selectors.osc1.getPitch),
        volume: useSelector(m.selectors.osc1.getVolume)
    };

    const handlePower = async () => {

        if (audioContext) {
            return;
        }

        await Tone.start();

        m.dispatch.synth.setContext(Tone);
    };

    console.log(osc1);

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
                osc1={osc1}
            />
            <Synthesizer Tone={audioContext} />
            <Effects />
        </>
    );
};
