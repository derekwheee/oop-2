const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { REVERB_MIN_DECAY } = require('../utils/constants');

const internals = {};

module.exports = function Synthesizer({ attack, release, onChangeOctave }) {

    const m = useMiddleEnd();
    const octave = useSelector(m.selectors.synth.getOctave);
    const distortion = useSelector(m.selectors.synth.getDistortion);
    const reverb = useSelector(m.selectors.synth.getReverb);

    const [isKeyDown, setIsKeyDown] = useState({});

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [attack, release, octave, distortion, reverb, isKeyDown, handleKeyDown, handleKeyUp]);

    const toggleDistortion = useCallback(() => {

        m.dispatch.synth.setDistortion(distortion ? 0 : 1);
    }, [m, distortion]);

    const toggleReverb = useCallback(() => {

        m.dispatch.synth.setReverb(reverb === 5 ? REVERB_MIN_DECAY : 5);
    }, [m, reverb]);

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

        const note = internals.mapKeyToNote(octave)[key];

        if (note) {
            release(note);
        }

        setIsKeyDown({ ...isKeyDown, [key]: false });
    }, [isKeyDown, octave, release, onChangeOctave, toggleDistortion, toggleReverb]);

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
