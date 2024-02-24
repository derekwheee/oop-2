/* eslint-disable no-unused-vars */
const { useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { MENUS } = require('../../utils/constants');

const internals = {};

module.exports = function MidiTransport({ lock, selectedMenu, onSelectMenu }) {

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

        midiDevice?.addListener('controlchange', handleControlChange);

        return () => {

            midiDevice?.removeListener('controlchange', handleControlChange);
        };
    }, [
        midiDevice,
        selectedMenu,
        handleControlChange
    ]);

    const connectMidiDevice = useCallback(() => {

        console.log('MIDI Device connected!');
        console.log(WebMidi.inputs);

        // TODO: Make this a setting?
        m.dispatch.synth.setMidiDevice(WebMidi.inputs[2].channels[1]);
    }, [m, WebMidi]);

    const handleControlChange = useCallback(({ controller, data }) => {

        const [, , value] = data;

        if (!!value || !(controller.name in internals.midiMaps.MINILAB)) {
            return;
        }

        const nextMenu = internals.midiMaps.MINILAB[controller.name];

        onSelectMenu(selectedMenu === nextMenu ? null : nextMenu);
    }, [selectedMenu, onSelectMenu]);

    return null;
};

module.exports.propTypes = {
    lock: T.string,
    selectedMenu: T.string,
    onSelectMenu: T.func.isRequired
};

internals.midiMaps = {
    'MINILAB': {
        controller22: MENUS.SETTINGS,
        controller23: MENUS.SEQUENCER
    }
};
