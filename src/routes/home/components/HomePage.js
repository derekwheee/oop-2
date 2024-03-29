const { useEffect } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { REVERB_MIN_DECAY } = require('../../../utils/constants');

const internals = {};

module.exports = function HomePage({
    onPower,
    isReady,
    synthType,
    octave,
    distortion,
    reverb,
    delayTime,
    vibratoFrequency
}) {

    const { Status, Indicator } = internals;

    useEffect(() => {

        document.addEventListener('keyup', onPower);

        return () => {

            document.removeEventListener('keyup', onPower);
        };
    }, [onPower]);

    return (
        <Status $isReady={isReady}>
            <Indicator $isActive={isReady}>Power</Indicator>
            <Indicator $isActive>{octave > -1 ? '+' : ''}{octave}</Indicator>
            <Indicator $isActive>{synthType}</Indicator>
            <Indicator $isActive={distortion > 0}>DST</Indicator>
            <Indicator $isActive={reverb > REVERB_MIN_DECAY}>REV</Indicator>
            <Indicator $isActive={delayTime !== 0}>DEL</Indicator>
            <Indicator $isActive={vibratoFrequency !== 0}>VIB</Indicator>
        </Status>
    );
};

module.exports.propTypes = {
    onPower: T.func,
    isReady: T.bool,
    synthType: T.string,
    octave: T.number,
    distortion: T.number,
    reverb: T.number,
    delayTime: T.oneOfType([T.number, T.string]),
    vibratoFrequency: T.number
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
