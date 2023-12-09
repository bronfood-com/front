import styles from '../Navigation.module.scss';

const CashierNavigation = () => {
    return (
        <ul className={`${styles.nav__menu}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_catering}`}></div>
                <a href="/" className={styles.nav__link}>
                    Зарегистрироваться как заведение общественного питания
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                    Зарегистрироваться как покупатель
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_enter}`}></div>
                <a href="/" className={styles.nav__link}>
                    Войти
                </a>
            </li>
        </ul>
    );
};

export default CashierNavigation;
