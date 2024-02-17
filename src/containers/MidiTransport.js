const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');

const internals = {};

module.exports = function MidiTransport({ attack, release, onChangeSynth }) {

    const WebMidi = window.WebMidi;

    const [midiDevice, setMidiDevice] = useState();
    const [heldNotes, setHeldNotes] = useState([]);
    const [volume, setVolume] = useState(0);

    useEffect(() => {

        WebMidi.enable();
    });

    useEffect(() => {

        WebMidi.addOneTimeListener('connected', connectMidiDevice);
    }, [WebMidi, connectMidiDevice]);

    useEffect(() => {

        console.log(volume);

        // TODO: Handle more MIDI messages

        midiDevice?.channels[1].addListener('controlchange', handleControlChange);
        midiDevice?.channels[1].addListener('noteon', handleNoteOn);
        midiDevice?.channels[1].addListener('noteoff', handleNoteOff);

        return () => {

            midiDevice?.channels[1].removeListener('controlchange', handleControlChange);
            midiDevice?.channels[1].removeListener('noteon', handleNoteOn);
            midiDevice?.channels[1].removeListener('noteoff', handleNoteOff);
        };
    }, [volume, heldNotes, midiDevice, handleControlChange, handleNoteOn, handleNoteOff]);

    const connectMidiDevice = useCallback(() => {

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
            volumecoarse: () => {

                if (direction > 64) {
                    setVolume(volume + 1);
                }

                if (direction < 64) {
                    setVolume(volume - 1);
                }
            }
        };

        if (controller.name in controlMap) {
            controlMap[controller.name]();
        }
    }, [volume]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired,
    onChangeSynth: T.func.isRequired
};
