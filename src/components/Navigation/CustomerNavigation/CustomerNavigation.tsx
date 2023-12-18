import { Link } from 'react-router-dom';
import styles from '../Navigation.module.scss';
import { FC } from 'react';
interface CustomerNavigation {
    /**
     * Click on menu item redirects to link and close menu
     */
    handleItemMenuClick: React.MouseEventHandler<HTMLElement>;
}
const CustomerNavigation: FC<CustomerNavigation> = (props) => {
    return (
        <ul className={`${styles.nav__menu} ${styles.nav__menu_user}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <Link to="/profile" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    Редактировать личные данные
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_bankcard}`}></div>
                <Link to="/" className={styles.nav__link}>
                    Редактировать банковские данные
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_exit}`}></div>
                <Link to="/" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    Выйти
                </Link>
            </li>
        </ul>
    );
};

export default CustomerNavigation;
