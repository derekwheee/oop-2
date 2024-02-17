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

    const { Status, Indicator, Knob } = internals;

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
                <Indicator $isActive>{octave > -1 ? '+' : ''}{octave}</Indicator>
                <Indicator $isActive>{synth?.oscillator?.type}</Indicator>
            </Status>
            <Visualizer context={context} synth={synth} />

            <Knob label='DST' value={distortion}>{Math.round(distortion * 10) / 10}</Knob>
            <Knob label='REV' value={reverb}>{Math.round(reverb * 10) / 10}</Knob>
            <Knob label='DEL' value={delayFeedback}>{Math.round(delayFeedback * 10) / 10}</Knob>
            <Knob label='VIB' value={vibratoDepth}>{Math.round(vibratoDepth * 10) / 10}</Knob>
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
    background: #3f3;
`;

internals.Indicator = Styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background: ${(props) => (props.$isActive ? '#3f3' : '#000')};
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    color: ${(props) => (props.$isActive ? '#000' : '#3f3')};

    &:first-child {
        margin-right: auto;
    }
`;

internals.Knob = Styled.div`
    position: relative;
    width: 60px;
    padding: 15px 15px 45px;
    border: 1px solid currentColor;
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    color: #3f3;
    text-align: center;

    &:after {
        content: '${({ label }) => label}';
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
    }
`;
