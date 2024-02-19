const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { REVERB_MIN_DECAY } = require('../../utils/constants');

const internals = {};

module.exports = function Synthesizer({ attack, release }) {

    const m = useMiddleEnd();
    // const synth = useSelector(m.selectors.synth.getSynth);
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

    const handleKeyDown = useCallback(({ key }) => {

        if (isKeyDown[key]) {
            return;
        }

        setIsKeyDown({ ...isKeyDown, [key]: true });

        const note = internals.mapKeyToNote(2)[key];

        if (note) {
            attack(note);
        }
    }, [isKeyDown, attack]);

    const handleKeyUp = useCallback(({ key }) => {

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

        // if (key === '`') {
        //     return cycleOscillatorType();
        // }

        const note = internals.mapKeyToNote(2)[key];

        if (note) {
            release();
        }

        setIsKeyDown({ ...isKeyDown, [key]: false });
    }, [
        isKeyDown,
        release,
        toggleDistortion,
        toggleReverb,
        toggleDelay,
        toggleVibrato
    ]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired
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
