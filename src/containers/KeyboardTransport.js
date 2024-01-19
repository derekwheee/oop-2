const { useState, useEffect } = require('react');
const T = require('prop-types');
const { useCallback } = require('react');

const internals = {};

module.exports = function Synthesizer({ attack, release }) {

    const [isKeyDown, setIsKeyDown] = useState({});

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', kandleKeyUp);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', kandleKeyUp);
        };
    }, [isKeyDown, handleKeyDown, kandleKeyUp]);

    const handleKeyDown = useCallback(({ key }) => {

        if (isKeyDown[key]) {
            return;
        }

        setIsKeyDown({ ...isKeyDown, [key]: true });

        const note = internals.mapKeyToNote[key];

        if (note) {
            attack(note);
        }
    }, [isKeyDown, attack]);

    const kandleKeyUp = useCallback(({ key }) => {

        const note = internals.mapKeyToNote[key];

        if (note) {
            release(note);
        }

        setIsKeyDown({ ...isKeyDown, [key]: false });
    }, [isKeyDown, release]);

    return null;
};

module.exports.propTypes = {
    attack: T.func.isRequired,
    release: T.func.isRequired
};

internals.mapKeyToNote = {
    a: 'C3',
    w: 'C#3',
    s: 'D3',
    e: 'D#3',
    d: 'E3',
    f: 'F3',
    t: 'F#3',
    g: 'G3',
    y: 'G#3',
    h: 'A3',
    u: 'A#3',
    j: 'B3',
    k: 'C4',
    o: 'C#4',
    l: 'D4',
    p: 'D#4',
    ';': 'E4',
    '\'': 'F4'
};
