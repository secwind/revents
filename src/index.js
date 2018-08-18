import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';


const rootEL = document.getElementById('root');

let render = () => { 
    ReactDOM.render(<App />, rootEL)
}

if (module.hot) {
    module.hot.accept('./app/layout/App', () => { 
        setTimeout(render)
    })
}
render();

