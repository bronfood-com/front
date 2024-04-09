import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';

const Header = ({ city }: { city: string }) => {
    const { isLogin } = useCurrentUser();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { t } = useTranslation();
    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <button title={t('components.header.burgerTitleHover')} className={`${styles.header__burger} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                <div className={styles.header__place}>
                    <div className={styles.header__place_point}></div>
                    <p className={styles.header__place_name}>{city}</p>
                </div>
                <div className={styles.header__buttons}>
                    {isLogin ? <button title={t('components.header.favouritesTitleHover')} className={`${styles.header__favorite} ${styles.header__icon}`}></button> : ''}
                    <button title={t('components.header.searchTitleHover')} className={`${styles.header__search} ${styles.header__icon}`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <Link title={t('components.header.logoTitleHover')} className={styles.header__logo} to="/"></Link>
                    <button title={t('components.header.buttonCloseTitleHover')} className={`${styles.header__close} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                </div>
                <Navigation handleItemMenuClick={handleMenuActive} />
            </div>
        </header>
    );
};

export default Header;
