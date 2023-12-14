import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import ButtonLang from '../Button/ButtonLang/ButtonLang';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const lngs = {
        ru: { nativeName: 'Ru' },
        kk: { nativeName: 'Kk' },
    };
    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <button title={t('header.burgerTitleHover')} className={`${styles.header__burger} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                <div className={styles.header__place}>
                    <div className={styles.header__place_point}></div>
                    <p className={styles.header__place_name}>{t('header.placeName')}</p>
                </div>

                <div className={styles.header__buttons}>
                    <div className={styles.header__lang}>
                        <ButtonLang lngs={lngs} />
                    </div>
                    <button title={t('header.favouritesTitleHover')} className={`${styles.header__favorite} ${styles.header__icon}`}></button>
                    <button title={t('header.searchTitleHover')} className={`${styles.header__search} ${styles.header__icon}`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <a title={t('header.logoTitleHover')} className={styles.header__logo} href="#"></a>
                    <button title={t('header.buttonCloseTitleHover')} className={`${styles.header__close} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                </div>
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
