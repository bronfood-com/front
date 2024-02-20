import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popups/Popup/Popup';
import Button from '../../components/Button/Button';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <Popup onClose={() => navigate('/')}>
            <div className={styles.pageNotFound}>
                <div className={styles.pageNotFound__error}>
                    4
                    <div className={styles.pageNotFound__icon} />4
                </div>
                <p className={styles.pageNotFound__message}>{t('pages.pageNotFound.somethingWentWrong')}</p>
                <Button type="button" onClick={() => navigate('/')}>
                    {t('pages.pageNotFound.goBack')}
                </Button>
            </div>
        </Popup>
    );
};

export default PageNotFound;
