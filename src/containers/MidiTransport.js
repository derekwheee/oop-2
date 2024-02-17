const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');

const internals = {};

module.exports = function MidiTransport({ attack, release }) {

    const WebMidi = window.WebMidi;

    const [midiDevice, setMidiDevice] = useState();

    useEffect(() => {

        WebMidi.enable();
    });

    useEffect(() => {

        WebMidi.addOneTimeListener('connected', connectMidiDevice);
    }, [WebMidi, connectMidiDevice]);

    useEffect(() => {

        // TODO: Handle more MIDI messages
        midiDevice?.channels[1].addListener('noteon', handleNoteOn);
        midiDevice?.channels[1].addListener('noteoff', handleNoteOff);

        return () => {

            midiDevice?.channels[1].removeListener('noteon', handleNoteOn);
            midiDevice?.channels[1].removeListener('noteoff', handleNoteOff);
        };
    }, [midiDevice, handleNoteOn, handleNoteOff]);

    const connectMidiDevice = useCallback(() => {

        // TODO: Make this a setting?
        setMidiDevice(WebMidi.inputs[1]);
    }, [WebMidi]);

    const handleNoteOn = useCallback(({ note }) => {

        attack(`${note.name}${note.accidental || ''}${note.octave}`);
    }, [attack]);

    const handleNoteOff = useCallback(({ note }) => {

        // TODO: Handle release more elegantly
        release(`${note.name}${note.accidental || ''}${note.octave}`);
    }, [release]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired
};
