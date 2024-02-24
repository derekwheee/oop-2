/* eslint-disable no-unused-vars */
// const { useRef, useEffect, useCallback, useMemo } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = function Settings({ midiInput, midiChannel }) {

    const { Container, Title, Backdrop, Input, Heading } = internals;

    const inputs = window.WebMidi.inputs;

    return (
        <>
            <Container>
                <Title>Settings</Title>
                <div>
                    <Heading>MIDI Input</Heading>
                    <Input>{inputs[midiInput]?.name}</Input>
                </div>
                <div>
                    <Heading>MIDI Channel</Heading>
                    <Input>{midiChannel}</Input>
                </div>
            </Container>
            <Backdrop />
        </>
    );
};

module.exports.propTypes = {
    midiInput: T.number,
    midiChannel: T.number
};

internals.Container = Styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 300px;
    padding: 15px;
    border: 1px solid #fff;
    background: #000;
    box-shadow: 5px 5px 0px 0px black,
                15px 15px 0px 0px white;
    font-family: monospace;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    transform: translate(-50%, -50%);
    z-index: 10;
`;

internals.Title = Styled.div`
    margin: -10px -10px 0;
    background: #fff;
    text-align: center;
    color: #000;
`;

internals.Backdrop = Styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    opacity: 0.5;

    --s: 5px; /* control the size */
    
    --c: #0000 75%,rgba(0, 0, 0, 1) 0;
    --g1: conic-gradient(at 75% 25%,var(--c));
    --g2: conic-gradient(at 25% 75%,var(--c));
    background: 
      var(--g1),var(--g1) var(--s) var(--s),
      var(--g2),var(--g2) var(--s) var(--s) rgba(90, 90, 90, 1);
    background-size: calc(2*var(--s)) calc(2*var(--s));
`;

internals.Input = Styled.div`
    font-size: 1em;
`;

internals.Heading = Styled.div`
    display: inline-block;
    margin: 0.5em 0;
    padding: 0 0.5em;
    background: #fff;
    color: #000;
`;
