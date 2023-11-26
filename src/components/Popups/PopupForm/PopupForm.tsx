import { FC, ReactNode } from 'react';
import Button from '../../Button/Button';
import styles from './PopupForm.module.scss';

interface PopupForm {
    title: string;
    formName: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    buttonName: string;
    children: ReactNode;
}

const PopupForm: FC<PopupForm> = (props) => {
    return (
        <div className={styles.popup}>
            <h2 className={styles.popup__title}>{props.title}</h2>
            <form action="#" className={styles.popup__form} name={props.formName} onSubmit={props.onSubmit}>
                <div className={styles.popup__notice}>
                    <div className={styles.popup__warning}></div>
                    <span className={styles.popup__error}>Error</span>
                </div>
                {props.children}
                <Button buttonName={props.buttonName}></Button>
                {props.formName === 'form_signin' ? (
                    <a href="/" className={styles.popup__link}>
                        Регистрация
                    </a>
                ) : (
                    ''
                )}
            </form>
            <button className={`${styles.popup__close} button`} type="button"></button>
        </div>
    );
};

export default PopupForm;
