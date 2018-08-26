import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { ConfigStore } from './app/store/ConfigStore';
import  ScrollToTop  from './app/common/unit/ScrollToTop'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'

const store = ConfigStore()


const rootEL = document.getElementById('root')

let render = () => { 
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                    <ReduxToastr
                        position='top-right'
                        transitionIn='fadeIn'
                        transitionOut='fadeOut'
                    />
                    <App />
                </ScrollToTop>    
            </BrowserRouter>
        </Provider>,
        rootEL  
    )
}

if (module.hot) {
    module.hot.accept('./app/layout/App', () => { 
        setTimeout(render)
    })
}
render();

