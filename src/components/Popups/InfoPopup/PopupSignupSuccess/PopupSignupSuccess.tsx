import InfoImage from '../../../InfoImage/InfoImage';
import styles from './PopupSignupSuccess.module.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPopup from '../InfoPopup';

interface PopupSignupSuccessProps {
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Handle closing infoPopup
     */
    openInfoPopup: () => void;
    /**
     * Has this info window close button?
     */
    hasCloseButton?: boolean;
}

const PopupSignupSuccess: FC<PopupSignupSuccessProps> = (props) => {
    const { t } = useTranslation();
    return (
        <InfoPopup isOpened={props.isOpened} openInfoPopup={props.openInfoPopup}>
            <h2 className={styles.popup__title}>{t('pages.popupSignupSuccess.title')}</h2>
            <InfoImage mode="red_tube" />
        </InfoPopup>
    );
};

export default PopupSignupSuccess;
