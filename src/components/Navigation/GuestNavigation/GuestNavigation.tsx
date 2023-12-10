import styles from '../Navigation.module.scss';
import { useTranslation, Trans } from 'react-i18next';

const CashierNavigation = () => {
    const { t } = useTranslation();
    return (
        <ul className={`${styles.nav__menu}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_catering}`}></div>

                <a href="/" className={styles.nav__link}>
                <Trans i18nKey="description.part1">
                Зарегистрироваться как заведение общественного питания
                </Trans>
                </a>

            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_customer}`}></div>
                <a href="/" className={styles.nav__link}>
                {t('description.part2')}

                </a>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_enter}`}></div>
                <a href="/" className={styles.nav__link}>
                <Trans i18nKey="description.part3">
                    Войти
                </Trans>
                </a>
            </li>
        </ul>
    );
};

export default CashierNavigation;
