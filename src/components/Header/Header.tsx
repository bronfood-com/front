import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';

const Header = () => {
    const { isLogin } = useCurrentUser();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { t } = useTranslation();
    const { total } = useBasket();
    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <button title={t('components.header.burgerTitleHover')} className={`${styles.header__burger} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                <div className={styles.header__place}>
                    <div className={styles.header__place_point}></div>
                    <p className={styles.header__place_name}>{t('components.header.placeName')}</p>
                </div>
                <div className={styles.header__buttons}>
                    {isLogin ? <button title={t('components.header.favouritesTitleHover')} className={`${styles.header__favorite} ${styles.header__icon}`}></button> : ''}
                    <Link to="/basket">
                        <div className={styles.header__basket}>
                            <button title={t('components.header.basketTitleHover')} className={styles.header__icon} />
                            {total ? <span className={styles.header__chip}>{total}</span> : null}
                        </div>
                    </Link>
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
