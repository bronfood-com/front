import styles from '../Navigation.module.scss';
import { useTranslation } from 'react-i18next';

const GuestNavigation = () => {
    const { t } = useTranslation();
    return (
        <ul className={`${styles.nav__menu}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                    {t('guestNavigation.signUpAsABuyer')}
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_enter}`}></div>
                <a href="/" className={styles.nav__link}>
                {t('guestNavigation.signIn')}
                </a>
            </li>
        </ul>
    );
};

export default GuestNavigation;
