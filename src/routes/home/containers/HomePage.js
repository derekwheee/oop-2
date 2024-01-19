const { useState } = require('react');
const Tone = require('tone');
const HomePage = require('../components/HomePage');
const Synthesizer = require('../../../containers/Synthesizer');
const { SYNTH_TRANSPORTS } = require('../../../utils/constants');

const internals = {};

module.exports = function HomepageContainer() {

    const [audioContext, setAudioContext] = useState(null);

    const handlePower = async () => {

        await Tone.start();

        setAudioContext(Tone);
    };

    return (
        <>
            <HomePage onPower={handlePower} isReady={!!audioContext} />
            <Synthesizer Tone={audioContext} transport={SYNTH_TRANSPORTS.KEYBOARD} />
        </>
    );
};
