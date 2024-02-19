const { useState } = require('react');
const { MENUS } = require('../../utils/constants');
const Settings = require('../../components/Settings');
const Sequencer = require('../../components/Sequencer');
const MidiTransport = require('./MidiTransport');

const internals = {};

module.exports = function HomepageContainer() {

    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleSelectMenu = (menu) => {

        if (menu === null || Object.values(MENUS).includes(menu)) {
            setSelectedMenu(menu);
        }
    };

    return (
        <>
            {selectedMenu === MENUS.SETTINGS && <Settings />}
            {selectedMenu === MENUS.SEQUENCER && <Sequencer />}
            <MidiTransport selectedMenu={selectedMenu} onSelectMenu={handleSelectMenu} />
        </>
    );
};
