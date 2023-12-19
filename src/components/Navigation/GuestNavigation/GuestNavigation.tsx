import { Link } from 'react-router-dom';
import styles from '../Navigation.module.scss';
import { FC } from 'react';
interface CashierNavigation {
    /**
     * Click on menu item redirects to link and close menu
     */
    handleItemMenuClick: React.MouseEventHandler<HTMLElement>;
}
const CashierNavigation: FC<CashierNavigation> = (props) => {
    return (
        <ul className={`${styles.nav__menu}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_catering}`}></div>
                <Link to="/signup" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    Зарегистрироваться как заведение общественного питания
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <Link to="/signup" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    Зарегистрироваться как покупатель
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_enter}`}></div>
                <Link to="/signin" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    Войти
                </Link>
            </li>
        </ul>
    );
};

export default CashierNavigation;
