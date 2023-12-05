import styles from '../Navigation.module.scss';

const CateringNavigation = () => {
    return (
        <ul className={`${styles.nav__menu} ${styles.nav__menu_user}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                    Профиль
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_catering}`}></div>
                <a href="/" className={styles.nav__link}>
                    Мои заведения
                </a>
                <div></div>
                <ul className={styles.nav__optionals}>
                    <li className={styles.nav__link_optional}>Заведение 1</li>
                    <li className={styles.nav__link_optional}>Заведение 2</li>
                    <li>
                        <a href="/" className={styles.nav__addcatering}>
                            <p className={styles.nav__addcatering__text}>Добавить заведение</p>
                            <div className={styles.nav__addcatering__plus}></div>
                        </a>
                    </li>
                </ul>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_bankcard}`}></div>
                <a href="/" className={styles.nav__link}>
                    Банковские данные
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_cash}`}></div>
                <a href="/" className={styles.nav__link}>
                    Вывести средства
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_add}`}></div>
                <a href="/" className={styles.nav__link}>
                    Администраторы
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

export default CateringNavigation;
