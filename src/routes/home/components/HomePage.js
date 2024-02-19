const { useEffect } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const Visualizer = require('../../../components/Visualizer');

const internals = {};

module.exports = function HomePage({
    onPower,
    isReady,
    context,
    voice1,
    voice2,
    distortion,
    reverb,
    delayFeedback,
    vibratoDepth,
    osc1Waveform,
    osc1Octave,
    osc1Pitch,
    osc1Volume,
    osc2Waveform,
    osc2Octave,
    osc2Pitch,
    osc2Volume
}) {

    const { Status, Indicator, KnobBanks, Bank, Knob } = internals;

    useEffect(() => {

        document.addEventListener('keyup', onPower);

        return () => {

            document.removeEventListener('keyup', onPower);
        };
    }, [onPower]);

    return (
        <>
            <Status $isReady={isReady}>
                <Indicator $isActive={isReady}>Power</Indicator>
            </Status>
            <Visualizer context={context} voice1={voice1} voice2={voice2} />

            <KnobBanks>
                <Bank label='OSC 1'>
                    <Knob label='WFM' value={osc1Waveform}>{osc1Waveform.substring(0, 3)}</Knob>
                    <Knob label='OCT' value={osc1Octave}>{osc1Octave}</Knob>
                    <Knob label='PCH' value={osc1Pitch}>{osc1Pitch}</Knob>
                    <Knob label='VOL' value={osc1Volume}>{Math.round(osc1Volume * 10) / 10}</Knob>
                </Bank>
                <Bank label='OSC 2'>
                    <Knob label='WFM' value={osc2Waveform}>{osc2Waveform.substring(0, 3)}</Knob>
                    <Knob label='OCT' value={osc2Octave}>{osc2Octave}</Knob>
                    <Knob label='PCH' value={osc2Pitch}>{osc2Pitch}</Knob>
                    <Knob label='VOL' value={osc2Volume}>{Math.round(osc2Volume * 10) / 10}</Knob>
                </Bank>
                <Bank label='Filter'>
                    <Knob label='FRQ' value={distortion}>{Math.round(distortion * 10) / 10}</Knob>
                    <Knob label='EMP' value={reverb}>{Math.round(reverb * 10) / 10}</Knob>
                    <Knob label='AMT' value={delayFeedback}>{Math.round(delayFeedback * 10) / 10}</Knob>
                    <Knob label='VOL' value={vibratoDepth}>{Math.round(vibratoDepth * 10) / 10}</Knob>
                </Bank>
                <Bank label='Effects'>
                    <Knob label='DST' value={distortion}>{Math.round(distortion * 10) / 10}</Knob>
                    <Knob label='REV' value={reverb}>{Math.round(reverb * 10) / 10}</Knob>
                    <Knob label='DEL' value={delayFeedback}>{Math.round(delayFeedback * 10) / 10}</Knob>
                    <Knob label='VIB' value={vibratoDepth}>{Math.round(vibratoDepth * 10) / 10}</Knob>
                </Bank>
            </KnobBanks>
        </>
    );
};

module.exports.propTypes = {
    onPower: T.func,
    isReady: T.bool,
    context: T.object,
    voice1: T.object,
    voice2: T.object,
    distortion: T.number,
    reverb: T.number,
    delayFeedback: T.number,
    vibratoDepth: T.number,
    osc1Waveform: T.string,
    osc1Octave: T.number,
    osc1Pitch: T.number,
    osc1Volume: T.number,
    osc2Waveform: T.string,
    osc2Octave: T.number,
    osc2Pitch: T.number,
    osc2Volume: T.number
};

internals.Status = Styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    margin: auto;
    background: #fff;
`;

internals.Indicator = Styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background: ${(props) => (props.$isActive ? '#fff' : '#000')};
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    color: ${(props) => (props.$isActive ? '#000' : '#fff')};

    &:first-child {
        margin-right: auto;
    }
`;

internals.KnobBanks = Styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px;
`;

internals.Bank = Styled.div`
    position: relative;
    display: flex;
    flex-basis: calc(50% - 10px);
    margin: 5px;
    gap: 5px;
    padding-top: 29px;

    &:before {
        content: '${({ label }) => label}';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background: #fff;
        font-family: monospace;
        font-size: 1em;
        font-weight: bold;
        text-transform: uppercase;
        color: #000;
        text-align: center;
    }
`;

internals.Knob = Styled.div`
    position: relative;
    width: 25%;
    padding: 15px 0 45px;
    border: 1px solid currentColor;
    background: #000;
    font-family: monospace;
    font-size: 1.5em;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    text-align: center;

    &:after {
        content: '${({ label }) => label}';
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
    }
`;
