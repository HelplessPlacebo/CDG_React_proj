import React from 'react';
import ReactDOM from 'react-dom';
import AS from "./App.module.css"
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Data/redux-store";
import App from "./App";

{!localStorage.getItem("IsAuth") &&  localStorage.setItem("IsAuth", "false") }

ReactDOM.render(

    <HashRouter  basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <div className={AS.AppContainer}>
                    <App/>
            </div>
        </Provider>
    </HashRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
