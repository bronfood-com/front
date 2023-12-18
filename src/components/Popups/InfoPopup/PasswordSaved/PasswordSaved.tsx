import { useNavigate } from 'react-router-dom';
import InfoImage from '../../../InfoImage/InfoImage';
import Popup from '../../Popup/Popup';
import styles from './PasswordSaved.module.scss';
import { useEffect } from 'react';

const PasswordSaved = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup mode="info">
            <div className={styles.block}>
                <div className={styles.block__success}></div>
                <p className={styles.block__text}>Ваш пароль сохранен!</p>
                <InfoImage mode="red_tube"></InfoImage>
            </div>
        </Popup>
    );
};

export default PasswordSaved;
