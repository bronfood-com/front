import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './i18n.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/front' : ''}>
            <CurrentUserProvider>
                <App />
            </CurrentUserProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
