import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ConfirmPopup.module.scss';

type ConfirmationPopupProps = {
    title: string;
    confirmButtonText: string;
    onCancel: () => void;
    onSubmit: () => void | Promise<void>; // может быть и асинхронной // Орлов Дима
    onSuccess?: () => void; // необязательный callback // Орлов Дима
    children?: ReactNode; // сделал необязательным // Орлов Дима
};

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ title, confirmButtonText, onCancel, onSubmit, onSuccess, children }) => {
    const { t } = useTranslation();

    const handleSubmit = () => {
        const result = onSubmit();
        if (result && onSuccess) {
            result.then(onSuccess);
        }
    };
    return (
        <div className={styles.confirmPopup}>
            <h2 className={styles.confirmPopup__title}>{title}</h2>
            {children}
            <button className={styles.confirmPopup__close} onClick={onCancel}></button>
            <div className={styles.confirmPopup__buttonContainer}>
                <button className={styles.cancel} onClick={onCancel}>
                    {t('components.confirmationPopup.cancel')}
                </button>
                <button className={styles.confirm} onClick={handleSubmit}>
                    {confirmButtonText}
                </button>
            </div>
        </div>
    );
};
export default ConfirmationPopup;
