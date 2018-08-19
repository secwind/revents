import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

export const ConfigStore = (preloadstate) => {
    const middwares = [];
    const middwaresEnhancer = applyMiddleware(...middwares);

    const storeEnhancers = [middwaresEnhancer];

    const composeEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
        rootReducer,
        preloadstate,
        composeEnhancer
    );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }

    return store
}