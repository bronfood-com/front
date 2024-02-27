import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';

const Main = () => {
    const navigate = useNavigate();
    const { isLogin } = useCurrentUser();
    useEffect(() => {
        if (isLogin) {
            navigate('/restaurants');
        }
    }, [isLogin, navigate]);
    return <></>;
};

export default Main;
