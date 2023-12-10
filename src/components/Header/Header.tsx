import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import ButtonLang from '../Button/ButtonLang/ButtonLang';

const Header = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const lngs = {
        ru: { nativeName: 'Ru' },
        en: { nativeName: 'En' },
    };
    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <button title="Меню" className={`${styles.header__burger} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                <div className={styles.header__place}>
                    <div className={styles.header__place_point}></div>
                    <p className={styles.header__place_name}>Алматы</p>
                </div>

                <div className={styles.header__buttons}>
                    <div className={styles.header__lang}>
                        <ButtonLang lngs={lngs} />
                    </div>
                    <button title="Избранное" className={`${styles.header__favorite} ${styles.header__icon}`}></button>
                    <button title="Поиск" className={`${styles.header__search} ${styles.header__icon}`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <a title="BronFood" className={styles.header__logo} href="#"></a>
                    <button title="Закрыть" className={`${styles.header__close} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                </div>
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
