import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    console.log('Main');
    useEffect(() => {
        const checkLocalStorage = () => {
            const user = localStorage.getItem('user');
            if (user) {
                console.log('navigate');
                navigate('/restaurants');
            }
        };
        checkLocalStorage();
    }, [navigate]);
    return <></>;
};

export default Main;
