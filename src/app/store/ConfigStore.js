import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import  thunk  from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from '../config/firebase'

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true
}

export const ConfigStore = (preloadstate) => {
    const middwares = [thunk.withExtraArgument({getFirebase, getFirestore})]
        
    const middwaresEnhancer = applyMiddleware(...middwares)

    const storeEnhancers = [middwaresEnhancer]

    const composeEnhancer = composeWithDevTools(
        ...storeEnhancers, 
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
    )

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