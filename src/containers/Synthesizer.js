const { useCallback } = require('react');
const T = require('prop-types');
const KeyboardTransport = require('./KeyboardTransport');
const { SYNTH_TRANSPORTS } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ Tone, transport }) {

    const synth = Tone ? new Tone.PolySynth(Tone.Synth).toDestination() : null;

    const attack = useCallback((note, time) => {

        synth.triggerAttack(note, time || Tone.now());
    }, [Tone, synth]);

    const release = useCallback((note, time) => {

        synth.triggerRelease(note, time || Tone.now());
    }, [Tone, synth]);

    if (!Tone) {
        return null;
    }

    if (transport === SYNTH_TRANSPORTS.KEYBOARD) {
        return <KeyboardTransport synth={synth} attack={attack} release={release} />;
    }

    return null;
};

module.exports.propTypes = {
    Tone: T.object,
    transport: T.oneOf([SYNTH_TRANSPORTS.KEYBOARD])
};
