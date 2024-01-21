const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');
const Visualizer = require('../../../components/Visualizer');

const internals = {};

module.exports = function HomepageContainer() {

    const m = useMiddleEnd();
    const audioContext = useSelector(m.selectors.synth.getContext);
    const synth = useSelector(m.selectors.synth.getSynth);
    const octave = useSelector(m.selectors.synth.getOctave);

    const handlePower = async () => {

        if (audioContext) {
            return;
        }

        await Tone.start();

        m.dispatch.synth.setContext(Tone);
    };

    return (
        <>
            <HomePage onPower={handlePower} isReady={!!audioContext} octave={octave} />
            <Synthesizer Tone={audioContext} />
            <Visualizer context={Tone} synth={synth} />
        </>
    );
};
