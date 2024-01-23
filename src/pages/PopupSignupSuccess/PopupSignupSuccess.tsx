import InfoImage from '../../components/InfoImage/InfoImage';
import styles from './PopupSignupSuccess.module.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPopup from '../../components/Popups/InfoPopup/InfoPopup';

interface PopupSignupSuccessProps {
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Handle closing infoPopup
     */
    openInfoPopup: () => void;
}

const PopupSignupSuccess: FC<PopupSignupSuccessProps> = (props) => {
    const { t } = useTranslation();

    return (
        <InfoPopup mode="info" isOpened={props.isOpened} openInfoPopup={props.openInfoPopup}>
            <h2 className={styles.popup__title}>{t('pages.popupSignupSuccess.title')}</h2>
            <InfoImage mode="red_tube" />
        </InfoPopup>
    );
};

export default PopupSignupSuccess;
