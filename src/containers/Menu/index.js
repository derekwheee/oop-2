const { useState, useEffect } = require('react');
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

    useEffect(() => {

        if (selectedMenu === MENUS.SETTINGS) {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.SETTINGS);
        }
        else if (selectedMenu === MENUS.SEQUENCER) {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.SEQUENCER);
        }
        else {
            m.dispatch.midi.setTransportLock(TRANSPORT_LOCK.UNLOCKED);
        }
    }, [m, selectedMenu]);

    const handleSelectMenu = (menu) => {

        if (menu === null || Object.values(MENUS).includes(menu)) {
            setSelectedMenu(menu);
        }
    };

    return (
        <>
            {selectedMenu === MENUS.SETTINGS && <Settings />}
            {selectedMenu === MENUS.SEQUENCER && <Sequencer />}
            <MidiTransport lock={transportLock} selectedMenu={selectedMenu} onSelectMenu={handleSelectMenu} />
        </>
    );
};
