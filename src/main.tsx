import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './i18n.tsx';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext.tsx';
import { RestaurantsProvider } from './contexts/RestaurantsContext.tsx';
import { BasketProvider } from './contexts/BasketContext.tsx';

const router = createHashRouter([{ path: '*', element: <App /> }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CurrentUserProvider>
            <RestaurantsProvider>
                <BasketProvider>
                    <RouterProvider router={router} />
                </BasketProvider>
            </RestaurantsProvider>
        </CurrentUserProvider>
    </React.StrictMode>,
);
