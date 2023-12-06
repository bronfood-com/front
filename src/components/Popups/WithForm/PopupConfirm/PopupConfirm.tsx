import Popup from '../../Popup/Popup';
import styles from './PopupConfirm.module.scss';
import Form from '../../../Form/Form';
import Button from '../../../Button/Button';

const PopupConfirm = () => {
    const onSubmit = () => {};
    return (
        <Popup>
            <h2 className={styles.popup__title}>Подтверждение номера</h2>
            <p className={styles.popup__subtitle}>Ввведите код из смс</p>
            <Form name="form-confirm-number" onSubmit={onSubmit}>
                <div className={styles.popup__inputs}>
                    <input className={styles.popup__input} type="number" name="one"></input>
                    <input className={styles.popup__input} type="number" name="one"></input>
                    <input className={styles.popup__input} type="number" name="one"></input>
                    <input className={styles.popup__input} type="number" name="one"></input>
                </div>
                <Button>Далее</Button>
            </Form>
        </Popup>
    );
};

export default PopupConfirm;
