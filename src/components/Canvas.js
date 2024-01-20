const React = require('react');

const internals = {};

module.exports = React.forwardRef((props, ref) => {

    return <canvas ref={ref} {...props} />;
});
