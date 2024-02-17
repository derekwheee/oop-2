/* eslint-disable no-unused-vars */
const { useRef, useEffect, useCallback, useMemo } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 200;

module.exports = function Visualizer({ context: Tone, synth }) {

    const { Container } = internals;

    const canvasRef = useRef(null);
    const waveform = useMemo(() => new Tone.Waveform(), [Tone]);
    synth?.connect(waveform);

    useEffect(() => {

        const timer = setInterval(updateWaveform, 25);

        return () => {

            clearInterval(timer);
        };
    }, [updateWaveform]);

    const updateWaveform = useCallback(() => {

        const value = waveform.getValue();
        const byteLength = 1024;
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = 'rgb(0 0 0)';
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(50 255 50)';
        context.beginPath();

        for (let i = 0; i < CANVAS_WIDTH; ++i) {

            context.lineTo(i, value[i * byteLength / CANVAS_WIDTH] * CANVAS_HEIGHT / 2 + CANVAS_HEIGHT / 2);
        }

        context.stroke();
    }, [waveform]);

    return (
        <Container>
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        </Container>
    );
};

module.exports.propTypes = {
    context: T.object.isRequired,
    synth: T.object
};

internals.Container = Styled.div`

`;
