const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');

const internals = {};

module.exports = function HomepageContainer() {

    const [audioContext, setAudioContext] = useState(null);

    const m = useMiddleEnd();
    const octave = useSelector(m.selectors.synth.getOctave);

    const handlePower = async () => {

        if (audioContext) {
            return;
        }

        await Tone.start();

        setAudioContext(Tone);
    };

    return (
        <>
            <HomePage onPower={handlePower} isReady={!!audioContext} octave={octave} />
            <Synthesizer Tone={audioContext} />
        </>
    );
};
