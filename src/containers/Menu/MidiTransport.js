/* eslint-disable no-unused-vars */
const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { MENUS } = require('../../utils/constants');

const internals = {};

module.exports = function MidiTransport({ lock, selectedMenu, onSelectMenu, onKnobChange }) {

    const WebMidi = window.WebMidi;

    const m = useMiddleEnd();

    const midiDevice = useSelector(m.selectors.synth.getMidiDevice);

    useEffect(() => {

        WebMidi.enable();
    });

    useEffect(() => {

        WebMidi.addOneTimeListener('connected', connectMidiDevice);
    }, [WebMidi, connectMidiDevice]);

    useEffect(() => {

        midiDevice?.addListener('controlchange', routeControlChange);

        return () => {

            midiDevice?.removeListener('controlchange', routeControlChange);
        };
    }, [
        midiDevice,
        selectedMenu,
        routeControlChange
    ]);

    const connectMidiDevice = useCallback(() => {

        console.log('MIDI Device connected!');
        console.log(WebMidi.inputs);

        // TODO: Make this a setting?
        m.dispatch.synth.setMidiDevice(WebMidi.inputs[2].channels[1]);
    }, [m, WebMidi]);

    const routeControlChange = useCallback(({ controller, data }) => {

        const [, , value] = data;

        if (value && controller.name in internals.menus.MINILAB) {
            handleChangeMenu({ controller, data }, selectedMenu);
        }
        else {
            onKnobChange({ controller, data });
        }
    }, [selectedMenu, onKnobChange, handleChangeMenu]);

    const handleChangeMenu = useCallback(({ controller }, selected) => {

        const nextMenu = internals.menus.MINILAB[controller.name];

        onSelectMenu(selected === nextMenu ? null : nextMenu);
    }, [onSelectMenu]);

    return null;
};

module.exports.propTypes = {
    lock: T.string,
    selectedMenu: T.string,
    onSelectMenu: T.func.isRequired,
    onKnobChange: T.func.isRequired
};

internals.menus = {
    'MINILAB': {
        controller22: MENUS.SETTINGS,
        controller23: MENUS.SEQUENCER
    }
};
