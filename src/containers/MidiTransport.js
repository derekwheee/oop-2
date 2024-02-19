const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');

const internals = {};

module.exports = function MidiTransport({ attack, release, onChangeSynth }) {

    const WebMidi = window.WebMidi;

    const [midiDevice, setMidiDevice] = useState();
    const [heldNotes, setHeldNotes] = useState([]);

    const m = useMiddleEnd();

    // Effects
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayTime = useSelector(m.selectors.synth.getDelayTime);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoFrequency = useSelector(m.selectors.synth.getVibratoFrequency);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    // Oscillator 1
    const [osc1Waveform] = useSelector(m.selectors.osc1.getWaveform);
    const [osc1Octave] = useSelector(m.selectors.osc1.getOctave);
    const [osc1Pitch] = useSelector(m.selectors.osc1.getPitch);
    const [osc1Volume] = useSelector(m.selectors.osc1.getVolume);

    // Oscillator 2
    const [osc2Waveform] = useSelector(m.selectors.osc2.getWaveform);
    const [osc2Octave] = useSelector(m.selectors.osc2.getOctave);
    const [osc2Pitch] = useSelector(m.selectors.osc2.getPitch);
    const [osc2Volume] = useSelector(m.selectors.osc2.getVolume);

    useEffect(() => {

        WebMidi.enable();
    });

    useEffect(() => {

        WebMidi.addOneTimeListener('connected', connectMidiDevice);
    }, [WebMidi, connectMidiDevice]);

    useEffect(() => {

        midiDevice?.channels[1].addListener('controlchange', handleControlChange);
        midiDevice?.channels[1].addListener('noteon', handleNoteOn);
        midiDevice?.channels[1].addListener('noteoff', handleNoteOff);

        return () => {

            midiDevice?.channels[1].removeListener('controlchange', handleControlChange);
            midiDevice?.channels[1].removeListener('noteon', handleNoteOn);
            midiDevice?.channels[1].removeListener('noteoff', handleNoteOff);
        };
    }, [
        distortion,
        reverb,
        delayTime,
        delayFeedback,
        vibratoFrequency,
        vibratoDepth,
        heldNotes,
        midiDevice,
        handleControlChange,
        handleNoteOn,
        handleNoteOff
    ]);

    const connectMidiDevice = useCallback(() => {

        console.log('MIDI Device connected!');
        console.log(WebMidi.inputs);

        // TODO: Make this a setting?
        setMidiDevice(WebMidi.inputs[1]);
    }, [WebMidi]);

    const handleNoteOn = useCallback(({ note }) => {

        const noteString = `${note.name}${note.accidental || ''}${note.octave}`;

        setHeldNotes([...heldNotes, noteString]);
        attack(noteString);
    }, [heldNotes, attack]);

    const handleNoteOff = useCallback(({ note }) => {

        const noteString = `${note.name}${note.accidental || ''}${note.octave}`;
        const shouldRelease = !midiDevice.channels[1].notesState.find(Boolean);

        if (shouldRelease) {
            setHeldNotes([]);
            release();
        }
        else {
            const nextHeldNotes = heldNotes.filter((n) => n !== noteString);

            setHeldNotes(nextHeldNotes);
            onChangeSynth({ frequency: nextHeldNotes[nextHeldNotes.length - 1] });
        }
    }, [heldNotes, midiDevice, release, onChangeSynth]);

    const handleControlChange = useCallback(({ controller, data }) => {

        const [, , direction] = data;

        const controlMap = {
            // Oscillator 1
            osc1Waveform: () => internals.reactToControlChange(direction, osc1Waveform, m.dispatch.osc1.setWaveform),
            osc1Octave: () => internals.reactToControlChange(direction, osc1Octave, m.dispatch.osc1.setOctave),
            osc1Pitch: () => internals.reactToControlChange(direction, osc1Pitch, m.dispatch.osc1.setPitch),
            osc1Volume: () => internals.reactToControlChange(direction, osc1Volume, m.dispatch.osc1.setVolume),
            // Oscillator 2
            osc2Waveform: () => internals.reactToControlChange(direction, osc2Waveform, m.dispatch.osc2.setWaveform),
            osc2Octave: () => internals.reactToControlChange(direction, osc2Octave, m.dispatch.osc2.setOctave),
            osc2Pitch: () => internals.reactToControlChange(direction, osc2Pitch, m.dispatch.osc2.setPitch),
            osc2Volume: () => internals.reactToControlChange(direction, osc2Volume, m.dispatch.osc2.setVolume),
            // Effects
            distortion: () => internals.reactToControlChange(direction, distortion, m.dispatch.synth.setDistortion),
            reverb: () => internals.reactToControlChange(direction, reverb, m.dispatch.synth.setReverb),
            delay: () => {

                // TODO: This is wrong and needs to be fixed
                m.dispatch.synth.setDelayTime(delayFeedback - 0.1 <= 0 ? 0 : '8n');
                internals.reactToControlChange(direction, delayFeedback, m.dispatch.synth.setDelayFeedback);
            },
            vibrato: () => {

                // TODO: This is wrong and needs to be fixed
                m.dispatch.synth.setVibratoFrequency(vibratoDepth - 0.1 <= 0 ? 0 : 4);
                internals.reactToControlChange(direction, vibratoDepth, m.dispatch.synth.setVibratoDepth);
            }
        };

        if (controller.name in internals.midiMaps.MINILAB) {
            controlMap[internals.midiMaps.MINILAB[controller.name]]();
        }
        else {
            console.log('UNRECOGNIZED CONTROL CHANGE');
            console.log(controller);
        }
    }, [
        m,
        osc1Waveform,
        osc1Octave,
        osc1Pitch,
        osc1Volume,
        osc2Waveform,
        osc2Octave,
        osc2Pitch,
        osc2Volume,
        distortion,
        reverb,
        delayFeedback,
        vibratoDepth
    ]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired,
    onChangeSynth: T.func.isRequired
};

internals.midiMaps = {
    'MINILAB': {
        // Oscillator 1
        UNASSIGNED_A: 'osc1Waveform',
        UNASSIGNED_B: 'osc1Octave',
        UNASSIGNED_C: 'osc1Pitch',
        UNASSIGNED_D: 'osc1Volume',
        // Oscillator 2
        UNASSIGNED_E: 'osc2Waveform',
        UNASSIGNED_F: 'osc2Octave',
        UNASSIGNED_G: 'osc2Pitch',
        UNASSIGNED_H: 'osc2Volume',
        // Effects
        generalpurposecontroller2: 'distortion',
        effect1depth: 'reverb',
        controller79: 'delay',
        releasetime: 'vibrato'
    }
};

internals.reactToControlChange = (direction, comparator, setter) => {

    if (direction > 64) {
        setter(comparator + 0.1);
    }

    if (direction < 64) {
        setter(comparator - 0.1);
    }
};
