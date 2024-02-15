//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

import Popup from '../../components/Popups/Popup/Popup';
import styles from './PageNotFound.module.scss';

import { useTranslation } from 'react-i18next';


const PageNotFound = () => {


  //  const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Popup >
            <div className={styles.pageNotFound}>
                <h1>
                    4<span></span>4
                </h1>
                <Link to='/'>
                    <Button disabled={false}>{t('pages.pageNotFound.goBack')}</Button>
                </Link>

            </div>
        </Popup>
    );
};

export default PageNotFound;
