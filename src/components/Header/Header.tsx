import { FC, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
interface Header {
    /**
     * Login status. When true, the user is logged in
     */
    isLogin: boolean;
}
const Header: FC<Header> = (props) => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { t } = useTranslation();
    const { logout } = useCurrentUser();

    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };
    const handleItemMenuClick = () => {
        setIsMenuActive(!isMenuActive);
        logout();
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
                    {props.isLogin ? <button title={t('components.header.favouritesTitleHover')} className={`${styles.header__favorite} ${styles.header__icon}`}></button> : ''}
                    <button title={t('components.header.searchTitleHover')} className={`${styles.header__search} ${styles.header__icon}`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <Link title={t('components.header.logoTitleHover')} className={styles.header__logo} to="/" onClick={handleItemMenuClick}></Link>
                    <button title={t('components.header.buttonCloseTitleHover')} className={`${styles.header__close} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                </div>
                <Navigation handleItemMenuClick={handleItemMenuClick} isLogin={props.isLogin} />
            </div>
        </header>
    );
};

export default Header;
