const { useEffect } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const Visualizer = require('../../../components/Visualizer');

const internals = {};

module.exports = function HomePage({
    onPower,
    isReady,
    context,
    synth,
    octave,
    distortion,
    reverb,
    delayFeedback,
    vibratoDepth
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
                <Indicator $isActive>{synth?.oscillator?.type}</Indicator>
            </Status>
            <Visualizer context={context} synth={synth} />

            <KnobBanks>
                <Bank label='OSC 1'>
                    <Knob label='WFM' value={distortion}>{Math.round(distortion * 10) / 10}</Knob>
                    <Knob label='OCT' value={reverb}>{Math.round(reverb * 10) / 10}</Knob>
                    <Knob label='PCH' value={delayFeedback}>{Math.round(delayFeedback * 10) / 10}</Knob>
                    <Knob label='VOL' value={vibratoDepth}>{Math.round(vibratoDepth * 10) / 10}</Knob>
                </Bank>
                <Bank label='OSC 2'>
                    <Knob label='WFM' value={distortion}>{Math.round(distortion * 10) / 10}</Knob>
                    <Knob label='OCT' value={reverb}>{Math.round(reverb * 10) / 10}</Knob>
                    <Knob label='PCH' value={delayFeedback}>{Math.round(delayFeedback * 10) / 10}</Knob>
                    <Knob label='VOL' value={vibratoDepth}>{Math.round(vibratoDepth * 10) / 10}</Knob>
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
    synth: T.object,
    octave: T.number,
    distortion: T.number,
    reverb: T.number,
    delayFeedback: T.number,
    vibratoDepth: T.number
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
    padding: 15px 15px 45px;
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
