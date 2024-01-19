const { useEffect } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = function HomePage({ onPower, isReady }) {

    const { Status } = internals;

    useEffect(() => {

        document.addEventListener('keyup', onPower);

        return () => {

            document.removeEventListener('keyup', onPower);
        };
    }, [onPower]);

    return (
        <Status $isReady={isReady} />
    );
};

module.exports.propTypes = {
    onPower: T.func,
    isReady: T.bool
};

internals.Status = Styled.div`
    width: 100%;
    height: 50px;
    margin: auto;
    background: ${(props) => (props.$isReady ? '#33f' : '#f33')};
`;
