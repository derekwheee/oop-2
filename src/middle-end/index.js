const MiddleEnd = require('strange-middle-end');
const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');

const Synth = require('./synth');
const Osc1 = require('./osc1');
const Osc2 = require('./osc2');
const Midi = require('./midi');
const Router = require('./router');

exports.create = (options = {}) => {

    const middleEnd = MiddleEnd.create({
        mods: () => ({
            synth: Synth(middleEnd, options),
            osc1: Osc1(middleEnd, options),
            osc2: Osc2(middleEnd, options),
            midi: Midi(middleEnd, options),
            router: Router(middleEnd, options)
        }),
        createStore: (reducer, { router }) => {

            const middleware = [
                MiddleEnd.middleware.thunk,
                options.logErrors && MiddleEnd.middleware.errorLogger,
                router.middleware
            ];

            return Redux.createStore(reducer, ReduxDevtools.composeWithDevTools(
                Redux.applyMiddleware(...middleware.filter(Boolean))
            ));
        }
    });

    return middleEnd;
};
