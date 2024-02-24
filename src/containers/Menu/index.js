const { useState, useEffect, useCallback } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { MENUS, TRANSPORT_LOCK } = require('../../utils/constants');
const Settings = require('../../components/Settings');
const Sequencer = require('../../components/Sequencer');
const MidiTransport = require('./MidiTransport');

const internals = {};

module.exports = function HomepageContainer() {

    const [selectedMenu, setSelectedMenu] = useState(null);

    const m = useMiddleEnd();

    const transportLock = useSelector(m.selectors.midi.getTransportLock);

    const midiInputSetting = useSelector(m.selectors.settings.getMidiInput);
    const midiChannelSetting = useSelector(m.selectors.settings.getMidiChannel);

    useEffect(() => {

        if (selectedMenu === MENUS.SETTINGS && transportLock !== TRANSPORT_LOCK.SETTINGS) {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.SETTINGS);
        }
        else if (selectedMenu === MENUS.SEQUENCER && transportLock !== TRANSPORT_LOCK.SEQUENCER) {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.SEQUENCER);
        }
        else if (selectedMenu === null && transportLock !== TRANSPORT_LOCK.UNLOCKED) {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.UNLOCKED);
        }
    }, [m, selectedMenu, transportLock]);

    const handleSelectMenu = (menu) => {

        if (menu === null || Object.values(MENUS).includes(menu)) {
            setSelectedMenu(menu);
        }
    };

    const handleKnobChange = useCallback(({ controller, data }) => {

        console.log(transportLock);

        if (transportLock === TRANSPORT_LOCK.SETTINGS) {
            console.log(controller);
            console.log(data);
        }

        if (transportLock === TRANSPORT_LOCK.SEQUENCER) {

        }
    }, [transportLock]);

    return (
        <>
            {selectedMenu === MENUS.SETTINGS && (
                <Settings
                    midiInput={midiInputSetting}
                    midiChannel={midiChannelSetting}
                />
            )}
            {selectedMenu === MENUS.SEQUENCER && <Sequencer />}
            <MidiTransport
                lock={transportLock}
                selectedMenu={selectedMenu}
                onSelectMenu={handleSelectMenu}
                onKnobChange={handleKnobChange}
            />
        </>
    );
};
