import { FC } from 'react';
import styles from './ConfirmPopup.module.scss';

type ConfirmationPopupProps = {
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
};

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ title, confirmButtonText, cancelButtonText }) => {
    const onSubmit = () => {};
    const onCancel = () => {};

    return (
        <div className={styles.confirmPopup}>
            <h2 className={styles.confirmPopup__title}>{title}</h2>
            <button className={styles.confirmPopup__close}></button>
            <div className={styles.confirmPopup__buttonContainer}>
                <button className={styles.cancel} onClick={onCancel}>
                    {cancelButtonText}
                </button>
                <button className={styles.confirm} onClick={onSubmit}>
                    {confirmButtonText}
                </button>
            </div>
        </div>
    );
};
export default ConfirmationPopup;
