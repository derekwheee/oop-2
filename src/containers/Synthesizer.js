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

    // Oscillator 1
    const osc1Waveform = useSelector(m.selectors.osc1.getWaveform);
    const osc1Octave = useSelector(m.selectors.osc1.getOctave);
    const osc1Pitch = useSelector(m.selectors.osc1.getPitch);
    const osc1Volume = useSelector(m.selectors.osc1.getVolume);

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

    useEffect(() => {

        if (synth && osc1Waveform !== synth.oscillator.type) {
            synth.oscillator.set({ type: osc1Waveform });
        }

        if (synth) {
            synth.volume.value = osc1Volume;
        }
    }, [
        synth,
        osc1Waveform,
        osc1Volume
    ]);

    const handleChangeOctave = (o) => m.dispatch.synth.setSynthOctave(o);

    const handleChangeOscillator = useCallback((patch) => {

        synth.oscillator.set(patch);
    }, [synth]);

    const attack = useCallback((note, time) => {

        synth.triggerAttack(internals.pitchShift(note, osc1Octave, osc1Pitch), time || Tone.now());
    }, [Tone, synth, osc1Octave, osc1Pitch]);

    const release = useCallback((time) => {

        synth.triggerRelease(time || Tone.now());
    }, [Tone, synth]);

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

internals.pitchShift = (note, octave, shift) => {

    const [ogNote, ogOctave] = note.split(/(\d+)/).filter(Boolean);
    const noteIndex = internals.noteArray.indexOf(ogNote);
    const newOctave = Number(ogOctave) + octave;
    const newNote = internals.noteArray[(internals.noteArray.length + noteIndex + shift) % internals.noteArray.length];

    return `${newNote}${newOctave}`;
};

internals.noteArray = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
];
