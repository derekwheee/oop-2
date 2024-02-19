/* eslint-disable no-unused-vars */
const { useRef, useEffect, useCallback, useMemo } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 100;

module.exports = function Visualizer({ context: Tone, voice1, voice2 }) {

    const { Container } = internals;

    const canvasRef = useRef(null);
    const waveform = useMemo(() => new Tone.Waveform(), [Tone]);
    voice1?.connect(waveform);
    voice2?.connect(waveform);

    useEffect(() => {

        const timer = setInterval(updateWaveform, 100);

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
        context.strokeStyle = 'rgb(255 255 255)';
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
    voice1: T.object,
    voice2: T.object
};

internals.Container = Styled.div`

    canvas {
        width: 100%;
        height: 100px;
    }
`;
