exports.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

exports.scale = (inputY, yRange, xRange) => {

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;

    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;

    return outputX;
};
