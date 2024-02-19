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

    const osc1Waveform = useSelector(m.selectors.osc1.getWaveform);
    const osc1Octave = useSelector(m.selectors.osc1.getOctave);
    const osc1Pitch = useSelector(m.selectors.osc1.getPitch);
    const osc1Volume = useSelector(m.selectors.osc1.getVolume);

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
            volume: () => {

                internals.reactToControlChange(
                    direction,
                    setVolume(volume + 1),
                    setVolume(volume - 1)
                );
            },
            osc1Waveform: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.osc1.setWaveform(osc1Waveform + 0.1 > 1 ? 1 : osc1Waveform + 0.1),
                    m.dispatch.osc1.setWaveform(osc1Waveform - 0.1 < 0 ? 0 : osc1Waveform - 0.1)
                );
            },
            osc1Octave: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.osc1.setOctave(osc1Octave + 0.1 > 1 ? 1 : osc1Octave + 0.1),
                    m.dispatch.osc1.setOctave(osc1Octave - 0.1 < 0 ? 0 : osc1Octave - 0.1)
                );
            },
            osc1Pitch: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.osc1.setPitch(osc1Pitch + 0.1 > 1 ? 1 : osc1Pitch + 0.1),
                    m.dispatch.osc1.setPitch(osc1Pitch - 0.1 < 0 ? 0 : osc1Pitch - 0.1)
                );
            },
            osc1Volume: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.osc1.setVolume(osc1Volume + 0.1 > 1 ? 1 : osc1Volume + 0.1),
                    m.dispatch.osc1.setVolume(osc1Volume - 0.1 < 0 ? 0 : osc1Volume - 0.1)
                );
            },
            distortion: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.synth.setDistortion(distortion + 0.1 > 1 ? 1 : distortion + 0.1),
                    m.dispatch.synth.setDistortion(distortion - 0.1 < 0 ? 0 : distortion - 0.1)
                );
            },
            reverb: () => {

                internals.reactToControlChange(
                    direction,
                    m.dispatch.synth.setReverb(reverb + 0.1 > 1 ? 1 : reverb + 0.1),
                    m.dispatch.synth.setReverb(reverb - 0.1 < 0 ? 0.001 : reverb - 0.1)
                );
            },
            delay: () => {

                m.dispatch.synth.setDelayTime(delayFeedback - 0.1 <= 0 ? 0 : '8n');

                internals.reactToControlChange(
                    direction,
                    m.dispatch.synth.setDelayFeedback(delayFeedback + 0.1 > 1 ? 1 : delayFeedback + 0.1),
                    m.dispatch.synth.setDelayFeedback(delayFeedback - 0.1 < 0 ? 0 : delayFeedback - 0.1)
                );
            },
            vibrato: () => {

                m.dispatch.synth.setVibratoFrequency(vibratoDepth - 0.1 <= 0 ? 0 : 4);

                internals.reactToControlChange(
                    direction,
                    m.dispatch.synth.setVibratoDepth(vibratoDepth + 0.1 > 1 ? 1 : vibratoDepth + 0.1),
                    m.dispatch.synth.setVibratoDepth(vibratoDepth - 0.1 < 0 ? 0 : vibratoDepth - 0.1)
                );
            }
        };

        if (controller.name in internals.midiMaps.MINILAB) {
            controlMap[internals.midiMaps.MINILAB[controller.name]]();
        }
    }, [
        m,
        osc1Waveform,
        osc1Octave,
        osc1Pitch,
        osc1Volume,
        distortion,
        reverb,
        delayFeedback,
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

internals.midiMaps = {
    'MINILAB': {
        volumecoarse: 'volume',
        generalpurposecontroller2: 'distortion',
        effect1depth: 'reverb',
        controller79: 'delay',
        releasetime: 'vibrato'
    }
};

internals.reactToControlChange = (direction, increaseFn, decreaseFn) => {

    if (direction > 64) {
        increaseFn();
    }

    if (direction < 64) {
        decreaseFn();
    }
};
