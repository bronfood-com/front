import styles from '../Navigation.module.scss';

const CashierNavigation = () => {
    return (
        <ul className={`${styles.nav__menu} ${styles.nav__menu_user}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_exit}`}></div>
                <a href="/" className={styles.nav__link}>
                    Выйти
                </a>
            </li>
        </ul>
    );
};

export default CashierNavigation;
