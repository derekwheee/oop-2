const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');
const Effects = require('../../../containers/Effects');
const Visualizer = require('../../../components/Visualizer');

const internals = {};

module.exports = function HomepageContainer() {

    const m = useMiddleEnd();
    const audioContext = useSelector(m.selectors.synth.getContext);
    const synth = useSelector(m.selectors.synth.getSynth);
    const octave = useSelector(m.selectors.synth.getOctave);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayTime = useSelector(m.selectors.synth.getDelayTime);
    const vibratoFrequency = useSelector(m.selectors.synth.getVibratoFrequency);

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
                synth={synth}
                octave={octave}
                distortion={distortion}
                reverb={reverb}
                delayTime={delayTime}
                vibratoFrequency={vibratoFrequency}
            />
            <Synthesizer Tone={audioContext} />
            <Effects />
            <Visualizer context={Tone} synth={synth} />
        </>
    );
};
