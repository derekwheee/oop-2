const { useCallback, useEffect } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const KeyboardTransport = require('./KeyboardTransport');
const { SYNTH_TRANSPORTS } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ Tone }) {

    const m = useMiddleEnd();
    const transport = useSelector(m.selectors.synth.getTransport);
    const synth = useSelector(m.selectors.synth.getSynth);

    useEffect(() => {

        if (Tone && !synth) {
            m.dispatch.synth.setSynth(new Tone.PolySynth(Tone.AMSynth).toDestination());
        }
    }, [m, Tone, synth]);

    const handleChangeOctave = (o) => m.dispatch.synth.setSynthOctave(o);

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
                <KeyboardTransport onChangeOctave={handleChangeOctave} attack={attack} release={release} />
            )}
        </>
    );
};

module.exports.propTypes = {
    Tone: T.object
};
