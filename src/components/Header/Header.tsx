import { FC, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
interface Header {
    /**
     * Login status. When true, the user is logged in
     */
    isLogin: boolean;
}
const Header: FC<Header> = (props) => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    };
    const handleItemMenuClick = () => {
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
                    {props.isLogin ? <button title="Избранное" className={`${styles.header__favorite} ${styles.header__icon}`}></button> : ''}
                    <button title="Поиск" className={`${styles.header__search} ${styles.header__icon}`}></button>
                </div>
            </div>
            <div className={`${styles.header__menu} ${isMenuActive ? styles.header__menu_active : ''}`}>
                <div className={styles.header__upblock}>
                    <Link title="BronFood" className={styles.header__logo} to="/" onClick={handleItemMenuClick}></Link>
                    <button title="Закрыть" className={`${styles.header__close} ${styles.header__icon}`} onClick={handleMenuActive}></button>
                </div>
                <Navigation handleItemMenuClick={handleItemMenuClick} isLogin={props.isLogin} />
            </div>
        </header>
    );
};

export default Header;
