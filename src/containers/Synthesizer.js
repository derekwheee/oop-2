const { useState, useMemo, useCallback } = require('react');
const T = require('prop-types');
const KeyboardTransport = require('./KeyboardTransport');
const Visualizer = require('../components/Visualizer');
const { SYNTH_TRANSPORTS } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ Tone, transport }) {

    const [octave, setOctave] = useState(2);

    const synth = useMemo(() => (Tone ? new Tone.PolySynth(Tone.AMSynth).toDestination() : null), [Tone]);

    const attack = useCallback((note, time) => {

        synth.triggerAttack(note, time || Tone.now());
    }, [Tone, synth]);

    const release = useCallback((note, time) => {

        synth.triggerRelease(note, time || Tone.now());
    }, [Tone, synth]);

    if (!Tone) {
        return null;
    }

    return (
        <>
            {transport === SYNTH_TRANSPORTS.KEYBOARD && (
                <KeyboardTransport synth={synth} octave={octave} onChangeOctave={setOctave} attack={attack} release={release} />
            )}
            <Visualizer context={Tone} synth={synth} />
        </>
    );

    return null;
};

module.exports.propTypes = {
    Tone: T.object,
    transport: T.oneOf([SYNTH_TRANSPORTS.KEYBOARD])
};
