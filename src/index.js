import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './context/ContextProvider';
import ThemeProvider from './context/ThemeProvider';

import { store } from 'redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    BrowserRouter >
    <
    Provider store = { store } >
    <
    ThemeProvider >
    <
    ContextProvider >
    <
    App / >
    <
    /ContextProvider>{' '} <
    /ThemeProvider>{' '} <
    /Provider>{' '} <
    /BrowserRouter>
);
// {/* </React.StrictMode>, */}
<
React.StrictMode > < /React.StrictMode>;