const { useEffect } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = function HomePage({ onPower, isReady }) {

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
        </Status>
    );
};

module.exports.propTypes = {
    onPower: T.func,
    isReady: T.bool
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
`;
