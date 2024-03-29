import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './i18n.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext.tsx';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/front' : ''}>
            <CurrentUserProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </CurrentUserProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
