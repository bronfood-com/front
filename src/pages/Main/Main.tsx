import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/restaurants');
        }
    }, [navigate]);
    return <></>;
};

export default Main;
