import InfoImage from '../../../InfoImage/InfoImage';
import Popup from '../../Popup/Popup';
import styles from './PasswordSaved.module.scss';

const PasswordSaved = () => {
    return (
        <Popup mode={'type_info'}>
            <div className={styles.block}>
                <div className={styles.block__success}></div>
                <p className={styles.block__text}>Ваш пароль сохранен!</p>
                <InfoImage></InfoImage>
            </div>
        </Popup>
    );
};

export default PasswordSaved;
