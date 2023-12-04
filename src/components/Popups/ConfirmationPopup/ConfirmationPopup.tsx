import { FC } from 'react';
import styles from './ConfirmPopup.module.scss';

type ConfirmationPopupProps = {
    title: string;
    confirmBtnText: 'Да' | 'Выйти';
    cancelBtnText: 'Отмена';
};

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ title, confirmBtnText, cancelBtnText }) => {
    const onSubmit = () => {};
    const onCancel = () => {};

    return (
        <div className={styles.confirmPopup}>
            <h2 className={styles.confirmPopup__title}>{title}</h2>
            <button className={styles.confirmPopup__close}></button>
            <div className={styles.confirmPopup__buttonContainer}>
                <button className={styles.cancel} onClick={onCancel}>
                    {cancelBtnText}
                </button>
                <button className={styles.confirm} onClick={onSubmit}>
                    {confirmBtnText}
                </button>
            </div>
        </div>
    );
};
export default ConfirmationPopup;
