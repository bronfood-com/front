import styles from './ButtonLang.module.scss';
import { useTranslation } from 'react-i18next';

const ButtonLang = (props: { lngs: { [lng: string]: { nativeName: string } } }) => {
    const { i18n } = useTranslation();

    return (
        <div>
            {Object.keys(props.lngs).map((lng) => (
                <button key={lng} className={styles.buttonlang} style={{ fontWeight: i18n.resolvedLanguage === lng
                ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {props.lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
};

export default ButtonLang;
