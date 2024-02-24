const { useState, useCallback, useEffect } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const KeyboardTransport = require('./KeyboardTransport');
const MidiTransport = require('./MidiTransport');
const { SYNTH_TRANSPORTS } = require('../../utils/constants');

const internals = {};

module.exports = function Synthesizer({ Tone }) {

    const [envelope, setEnvelope] = useState();

    const m = useMiddleEnd();
    const transport = useSelector(m.selectors.synth.getTransport);
    const voice1 = useSelector(m.selectors.synth.getVoice1);
    const voice2 = useSelector(m.selectors.synth.getVoice2);

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

    useEffect(() => {

        // TODO: Figure out how to make this work
        if (Tone && !envelope) {
            setEnvelope(new Tone.AmplitudeEnvelope({
                attack: 1,
                decay: 0.2,
                sustain: 1.0,
                release: 0.8
            }).toDestination());
        }

        if (Tone && envelope && !voice1) {

            m.dispatch.synth.setVoice1(new Tone.Synth({ envelope }).toDestination());
        }

        if (voice1 && osc1Waveform !== voice1.oscillator.type) {
            voice1.oscillator.set({ type: osc1Waveform });
        }

        if (voice1) {
            voice1.volume.value = osc1Volume;
        }
    }, [
        m,
        Tone,
        envelope,
        voice1,
        osc1Waveform,
        osc1Volume
    ]);

    useEffect(() => {

        if (Tone && envelope && !voice2) {

            m.dispatch.synth.setVoice2(new Tone.Synth({ envelope }).toDestination());
        }

        if (voice2 && osc2Waveform !== voice2.oscillator.type) {
            voice2.oscillator.set({ type: osc2Waveform });
        }

        if (voice2) {
            voice2.volume.value = osc2Volume;
        }
    }, [
        m,
        Tone,
        envelope,
        voice2,
        osc2Waveform,
        osc2Volume
    ]);

    const attack = useCallback((note, time) => {

        envelope?.triggerAttack(time || Tone.now());
        voice1?.triggerAttack(internals.pitchShift(note, osc1Octave, osc1Pitch), time || Tone.now());
        voice2?.triggerAttack(internals.pitchShift(note, osc2Octave, osc2Pitch), time || Tone.now());
    }, [Tone, envelope, voice1, osc1Octave, osc1Pitch, voice2, osc2Octave, osc2Pitch]);

    const release = useCallback((time) => {

        envelope?.triggerRelease(time || Tone.now());
        voice1.triggerRelease(time || Tone.now());
        voice2.triggerRelease(time || Tone.now());
    }, [Tone, envelope, voice1, voice2]);

    const handleUpdateSynth = useCallback(({ frequency }) => {

        voice1.set({ frequency: internals.pitchShift(frequency, osc1Octave, osc1Pitch) });
        voice2.set({ frequency: internals.pitchShift(frequency, osc2Octave, osc2Pitch) });
    }, [voice1, osc1Octave, osc1Pitch, voice2, osc2Octave, osc2Pitch]);

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

    if (!note) {
        return;
    }

    const [ogNote, ogOctave] = note.split(/(\d+)/).filter(Boolean);
    const noteIndex = internals.noteArray.indexOf(ogNote);
    let newOctave = Number(ogOctave) + octave;

    if (noteIndex + shift < 0) {
        --newOctave;
    }

    if (noteIndex + shift > internals.noteArray.length - 1) {
        ++newOctave;
    }

    // TODO: I think there's an octave issue here
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
