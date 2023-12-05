import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

const Header = () => {
    const [isMenuActive, SetIsMenuActive] = useState(false);
    const handleMenuActive = () => {
        SetIsMenuActive(!isMenuActive);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <button className={`${styles.header__burger} ${styles.header__icon} button`} onClick={handleMenuActive}></button>
                <div className={styles.header__place}>
                    <div className={styles.header__place_point}></div>
                    <p className={styles.header__place_name}>Алматы</p>
                </div>
                <div className={styles.header__buttons}>
                    <button className={`${styles.header__favorite} ${styles.header__icon} button`}></button>
                    <button className={`${styles.header__search} ${styles.header__icon} button`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <a className={styles.header__logo} href="#"></a>
                    <button className={`${styles.header__close} ${styles.header__icon} button`} onClick={handleMenuActive}></button>
                </div>
                <Navigation></Navigation>
            </div>
        </header>
    );
};

export default Header;
