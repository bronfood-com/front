import styles from '../Navigation.module.scss';
import { useTranslation } from 'react-i18next';

const CashierNavigation = () => {
    const { t } = useTranslation();
    return (
        <ul className={`${styles.nav__menu}`}>
{/* пока у нас нет страниц для заведения, то надо убрать ссылку на "Зарегистрироваться как заведение" */}

            {/*<li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_catering}`}></div>

                <a href="/" className={styles.nav__link}>
                {t('cashierNavigation.signUpAsACatering')}
                </a>
    </li> */}
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                    {t('cashierNavigation.signUpAsABuyer')}
                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_enter}`}></div>
                <a href="/" className={styles.nav__link}>
                {t('cashierNavigation.signUp')}
                </a>
            </li>
        </ul>
    );
};

export default CashierNavigation;
