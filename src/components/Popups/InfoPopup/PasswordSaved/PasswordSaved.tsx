import InfoImage from '../../../InfoImage/InfoImage';
import Popup from '../../Popup/Popup';
import styles from './PasswordSaved.module.scss';

const PasswordSaved = () => {
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
