import styles from '../Navigation.module.scss';

const CustomerNavigation = () => {
    return (
        <ul className={`${styles.nav__menu} ${styles.nav__menu_user}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                    Редактировать личные данные
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_bankcard}`}></div>
                <a href="/" className={styles.nav__link}>
                    Редактировать банковские данные
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_exit}`}></div>
                <a href="/" className={styles.nav__link}>
                    Выйти
                </a>
            </li>
        </ul>
    );
};

export default CustomerNavigation;
