const { useCallback, useEffect } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const KeyboardTransport = require('./KeyboardTransport');
const MidiTransport = require('./MidiTransport');
const { SYNTH_TRANSPORTS, SYNTH_TYPES, SYNTH_CONFIGS } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ Tone }) {

    const m = useMiddleEnd();
    const transport = useSelector(m.selectors.synth.getTransport);
    const synth = useSelector(m.selectors.synth.getSynth);
    const synthType = useSelector(m.selectors.synth.getType);
    const synthConfig = SYNTH_CONFIGS[synthType || SYNTH_TYPES.AM];

    useEffect(() => {

        if (Tone && !synth) {

            if (synthConfig.isPoly) {
                m.dispatch.synth.setSynth(new Tone.PolySynth(synthConfig.synth).toDestination());
            }
            else {
                m.dispatch.synth.setSynth(new synthConfig.synth().toDestination());
            }
        }
    }, [m, Tone, synth, synthConfig]);

    const handleChangeOctave = (o) => m.dispatch.synth.setSynthOctave(o);

    const handleChangeOscillator = useCallback((patch) => {

        synth.oscillator.set(patch);
    }, [synth]);

    const attack = useCallback((note, time) => {

        synth.triggerAttack(note, time || Tone.now());
    }, [Tone, synth]);

    const release = useCallback((note, time) => {

        if (synthConfig.isPoly) {
            synth.triggerRelease(note, time || Tone.now());
        }
        else {
            synth.triggerRelease(time || Tone.now());
        }
    }, [Tone, synth, synthConfig]);

    const handleUpdateSynth = useCallback((patch) => {

        synth.set(patch);
    }, [synth]);

    if (!Tone) {
        return null;
    }

    return (
        <>
            <MidiTransport
                attack={attack}
                release={release}
                onChangeSynth={handleUpdateSynth}
            />
            {transport === SYNTH_TRANSPORTS.KEYBOARD && (
                <KeyboardTransport
                    onChangeOctave={handleChangeOctave}
                    onChangeOscillator={handleChangeOscillator}
                    attack={attack}
                    release={release}
                />
            )}
        </>
    );
};

module.exports.propTypes = {
    Tone: T.object
};
