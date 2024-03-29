import { FC, useState, useEffect, MouseEvent } from 'react';
import styles from './Logout.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';

const Logout: FC = () => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const { currentUser, logout } = useCurrentUser();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const result = await logout.mutation();
        if (result !== null) {
            setIsErrorVisible(true);
        }
    };
    const handleCancel = () => navigate('/');
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            navigate('/');
        }
    };
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && handleCancel();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });

    return (
        <div className={styles.logout} onClick={handleOverlayClick}>
            <ConfirmationPopup title={t(`pages.logout.areYouSure`)} confirmButtonText={t(`pages.logout.signout`)} onCancel={handleCancel} onSubmit={handleLogout}>
                {logout.isLoading && <Preloader />}
                {isErrorVisible && logout.errorMessage && <ErrorMessage message={t(`pages.logout.${logout.errorMessage}`)} />}
            </ConfirmationPopup>
        </div>
    );
};

export default Logout;
