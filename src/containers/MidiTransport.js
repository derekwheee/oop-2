const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');

const internals = {};

module.exports = function MidiTransport({ attack, release, onChangeSynth }) {

    const WebMidi = window.WebMidi;

    const [midiDevice, setMidiDevice] = useState();
    const [heldNotes, setHeldNotes] = useState([]);
    const [volume, setVolume] = useState(0);

    const m = useMiddleEnd();
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayTime = useSelector(m.selectors.synth.getDelayTime);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoFrequency = useSelector(m.selectors.synth.getVibratoFrequency);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    useEffect(() => {

        WebMidi.enable();
    });

    useEffect(() => {

        WebMidi.addOneTimeListener('connected', connectMidiDevice);
    }, [WebMidi, connectMidiDevice]);

    useEffect(() => {

        // TODO: Handle more MIDI messages

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
        volume,
        heldNotes,
        midiDevice,
        handleControlChange,
        handleNoteOn,
        handleNoteOff
    ]);

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

        // console.log(controller);

        const [, , direction] = data;

        const controlMap = {
            volumecoarse: () => {

                if (direction > 64) {
                    setVolume(volume + 1);
                }

                if (direction < 64) {
                    setVolume(volume - 1);
                }
            },
            generalpurposecontroller2: () => {

                if (direction > 64 && distortion < 1) {
                    m.dispatch.synth.setDistortion(distortion + 0.1 > 1 ? 1 : distortion + 0.1);
                }

                if (direction < 64 && distortion > 0) {
                    m.dispatch.synth.setDistortion(distortion - 0.1 < 0 ? 0 : distortion - 0.1);
                }
            },
            effect1depth: () => {

                if (direction > 64 && reverb < 1) {
                    m.dispatch.synth.setReverb(reverb + 0.1 > 1 ? 1 : reverb + 0.1);
                }

                if (direction < 64 && reverb > 0) {
                    m.dispatch.synth.setReverb(reverb - 0.1 < 0 ? 0.001 : reverb - 0.1);
                }
            },
            controller79: () => {

                m.dispatch.synth.setDelayTime('8n');

                if (direction > 64 && delayFeedback < 1) {
                    m.dispatch.synth.setDelayFeedback(delayFeedback + 0.1 > 1 ? 1 : delayFeedback + 0.1);
                }

                if (direction < 64 && delayFeedback > 0) {
                    m.dispatch.synth.setDelayFeedback(delayFeedback - 0.1 < 0 ? 0 : delayFeedback - 0.1);
                }
            },
            releasetime: () => {

                m.dispatch.synth.setVibratoFrequency(vibratoFrequency ? 0 : 4);

                if (direction > 64 && vibratoDepth < 1) {
                    m.dispatch.synth.setVibratoDepth(vibratoDepth + 0.1 > 1 ? 1 : vibratoDepth + 0.1);
                }

                if (direction < 64 && vibratoDepth > 0) {
                    m.dispatch.synth.setVibratoDepth(vibratoDepth - 0.1 < 0 ? 0 : vibratoDepth - 0.1);
                }
            }
        };

        if (controller.name in controlMap) {
            controlMap[controller.name]();
        }
    }, [
        m,
        distortion,
        reverb,
        // delayTime,
        delayFeedback,
        vibratoFrequency,
        vibratoDepth,
        volume
    ]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired,
    onChangeSynth: T.func.isRequired
};
