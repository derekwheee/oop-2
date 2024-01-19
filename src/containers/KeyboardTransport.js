const { useState, useEffect } = require('react');
const T = require('prop-types');
const { useCallback } = require('react');

const internals = {};

module.exports = function Synthesizer({ attack, release, octave, onChangeOctave }) {

    const [isKeyDown, setIsKeyDown] = useState({});

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', kandleKeyUp);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', kandleKeyUp);
        };
    }, [attack, release, octave, isKeyDown, handleKeyDown, kandleKeyUp]);

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

    const kandleKeyUp = useCallback(({ key }) => {

        if (key === 'ArrowLeft') {
            return onChangeOctave(octave - 1);
        }

        if (key === 'ArrowRight') {
            return onChangeOctave(octave + 1);
        }

        const note = internals.mapKeyToNote(octave)[key];

        if (note) {
            release(note);
        }

        setIsKeyDown({ ...isKeyDown, [key]: false });
    }, [isKeyDown, octave, release, onChangeOctave]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired,
    octave: T.number.isRequired,
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
