const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { REVERB_MIN_DECAY, SYNTH_TYPES } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ attack, release, onChangeOctave }) {

    const m = useMiddleEnd();
    const synthType = useSelector(m.selectors.synth.getType);
    const octave = useSelector(m.selectors.synth.getOctave);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);
    const delayTime = useSelector(m.selectors.synth.getDelayTime);
    const delayFeedback = useSelector(m.selectors.synth.getDelayFeedback);
    const vibratoFrequency = useSelector(m.selectors.synth.getVibratoFrequency);
    const vibratoDepth = useSelector(m.selectors.synth.getVibratoDepth);

    const [isKeyDown, setIsKeyDown] = useState({});

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [
        attack,
        release,
        synthType,
        octave,
        distortion,
        reverb,
        delayTime,
        delayFeedback,
        vibratoFrequency,
        vibratoDepth,
        isKeyDown,
        handleKeyDown,
        handleKeyUp
    ]);

    const toggleDistortion = useCallback(() => {

        m.dispatch.synth.setDistortion(distortion ? 0 : 1);
    }, [m, distortion]);

    const toggleReverb = useCallback(() => {

        m.dispatch.synth.setReverb(reverb === 5 ? REVERB_MIN_DECAY : 5);
    }, [m, reverb]);

    const toggleDelay = useCallback(() => {

        m.dispatch.synth.setDelayTime(delayTime ? 0 : '8n');
        m.dispatch.synth.setDelayFeedback(delayFeedback ? 0 : 0.5);
    }, [m, delayTime, delayFeedback]);

    const toggleVibrato = useCallback(() => {

        m.dispatch.synth.setVibratoFrequency(vibratoFrequency ? 0 : 4);
        m.dispatch.synth.setVibratoDepth(vibratoDepth ? 0 : 1);
    }, [m, vibratoFrequency, vibratoDepth]);

    const cycleSynthType = useCallback(() => {

        const index = Object.values(SYNTH_TYPES).indexOf(synthType);
        const length = Object.values(SYNTH_TYPES).length;
        const next = index + 1 === length ? 0 : index + 1;

        m.dispatch.synth.setType(Object.values(SYNTH_TYPES)[next]);
        m.dispatch.synth.setSynth(null);
    }, [m, synthType]);

    const handleKeyDown = useCallback(({ key }) => {

        if (isKeyDown[key]) {
            return;
        }

        setIsKeyDown({ ...isKeyDown, [key]: true });

        const note = internals.mapKeyToNote(octave)[key];

        if (note) {
            attack(note);
        }
    }, [isKeyDown, octave, attack]);

    const handleKeyUp = useCallback(({ key }) => {

        if (key === 'ArrowLeft') {
            return onChangeOctave(octave - 1);
        }

        if (key === 'ArrowRight') {
            return onChangeOctave(octave + 1);
        }

        if (key === '1') {
            return toggleDistortion();
        }

        if (key === '2') {
            return toggleReverb();
        }

        if (key === '3') {
            return toggleDelay();
        }

        if (key === '4') {
            return toggleVibrato();
        }

        if (key === '`') {
            return cycleSynthType();
        }

        const note = internals.mapKeyToNote(octave)[key];

        if (note) {
            release(note);
        }

        setIsKeyDown({ ...isKeyDown, [key]: false });
    }, [
        isKeyDown,
        octave,
        release,
        onChangeOctave,
        toggleDistortion,
        toggleReverb,
        toggleDelay,
        toggleVibrato,
        cycleSynthType
    ]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired,
    onChangeOctave: T.func.isRequired
};

internals.mapKeyToNote = (octave) => ({
    a: `C${octave}`,
    w: `C#${octave}`,
    s: `D${octave}`,
    e: `D#${octave}`,
    d: `E${octave}`,
    f: `F${octave}`,
    t: `F#${octave}`,
    g: `G${octave}`,
    y: `G#${octave}`,
    h: `A${octave}`,
    u: `A#${octave}`,
    j: `B${octave}`,
    k: `C${octave + 1}`,
    o: `C#${octave + 1}`,
    l: `D${octave + 1}`,
    p: `D#${octave + 1}`,
    ';': `E${octave + 1}`,
    '\'': `F${octave + 1}`
});
