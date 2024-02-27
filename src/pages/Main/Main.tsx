import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkLocalStorage = () => {
            const user = localStorage.getItem('user');
            if (user) {
                navigate('/restaurants');
            }
        };
        checkLocalStorage();
        // useEffect needed on first render only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <></>;
};

export default Main;
