import { FC } from 'react';
import styles from './WaitingStatusScreen.module.scss';
// import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';

type WaitingStatusScreenProps = {
    // title: string;
};

const WaitingStatusScreen: FC<WaitingStatusScreenProps> = () => {
    // const { t } = useTranslation();
    return (
        <div className={styles.statusScreen}>
            <h2 className={styles.statusScreen__title}>Ожидайте подтверждения заказа</h2>
            <p className={styles.statusScreen__subtitle}>Приготовление начнётся с момента подтверждения</p>
            <img src={waitingImg} alt="waiting image" className={styles.statusScreen__img} />
            <ProgressBar duration={120} />
            <p className={styles.statusScreen__subtitleNote}>Ожидайте код заказа</p>
        </div>
    );
};

export default WaitingStatusScreen;
