const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');
const Effects = require('../../../containers/Synthesizer/Effects');
const Menu = require('../../../containers/Menu');

const internals = {};

module.exports = function HomepageContainer() {

    const m = useMiddleEnd();
    const audioContext = useSelector(m.selectors.synth.getContext);
    const voice1 = useSelector(m.selectors.synth.getVoice1);
    const voice2 = useSelector(m.selectors.synth.getVoice2);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    // Oscillator 1
    const [, osc1Waveform] = useSelector(m.selectors.osc1.getWaveform);
    const [, osc1Octave] = useSelector(m.selectors.osc1.getOctave);
    const [, osc1Pitch] = useSelector(m.selectors.osc1.getPitch);
    const [, osc1Volume] = useSelector(m.selectors.osc1.getVolume);

    // Oscillator 2
    const [, osc2Waveform] = useSelector(m.selectors.osc2.getWaveform);
    const [, osc2Octave] = useSelector(m.selectors.osc2.getOctave);
    const [, osc2Pitch] = useSelector(m.selectors.osc2.getPitch);
    const [, osc2Volume] = useSelector(m.selectors.osc2.getVolume);

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
                voice1={voice1}
                voice2={voice2}
                distortion={distortion}
                reverb={reverb}
                delayFeedback={delayFeedback}
                vibratoDepth={vibratoDepth}
                osc1Waveform={osc1Waveform}
                osc1Octave={osc1Octave}
                osc1Pitch={osc1Pitch}
                osc1Volume={osc1Volume}
                osc2Waveform={osc2Waveform}
                osc2Octave={osc2Octave}
                osc2Pitch={osc2Pitch}
                osc2Volume={osc2Volume}
            />
            <Synthesizer Tone={audioContext} />
            <Effects />
            <Menu />
        </>
    );
};
