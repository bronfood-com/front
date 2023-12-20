import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
    /**
     * Login status. When true, the user is logged in
     */
    islogin: boolean;
    /**
     * Potect component
     */
    component: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ islogin, component }) => {
    return islogin ? component : <Navigate to="/" />;
};

export default ProtectedRoute;
