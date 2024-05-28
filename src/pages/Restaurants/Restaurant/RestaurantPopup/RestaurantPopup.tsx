import { Dispatch, MouseEvent, ReactNode, SetStateAction, useEffect } from 'react';
import styles from './RestaurantPopup.module.scss';
import Button from '../../../../components/ButtonIconRound/ButtonIconRound';
import { useEsc } from '../../../../utils/hooks/useEsc/useEsc';
import { useParams } from 'react-router-dom';
import { useFavoritesMutations } from '../../../../utils/hooks/useFavorites/useFavorites';

type RestaurantPopupProps = {
    close: () => void;
    isMealPageOpen: boolean;
    setIsMealPageOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
    isLiked: boolean;
    restaurantId: string;
    handleLikeFavorite: () => void;
};

const RestaurantPopup = ({ close, isMealPageOpen, setIsMealPageOpen, children, isLiked, restaurantId, handleLikeFavorite }: RestaurantPopupProps) => {
    const { addFavorite, deleteFavorite } = useFavoritesMutations();
    const { mealId } = useParams();
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => !isMealPageOpen && close(), [isMealPageOpen, close]);
    useEffect(() => {
        if (!mealId) {
            setIsMealPageOpen(false);
        }
    }, [mealId, setIsMealPageOpen]);

    const handleFavoriteClick = (id: string) => {
        if (isLiked) {
            deleteFavorite.mutate(id, {
                onSuccess: (res) => {
                    if (res.status === 'success') {
                        handleLikeFavorite();
                    }
                },
            });
        } else {
            addFavorite.mutate(id, {
                onSuccess: (res) => {
                    if (res.status === 'success') {
                        handleLikeFavorite();
                    }
                },
            });
        }
    };

    return (
        <div className={styles.restaurant_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.restaurant_popup}>
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_like}`}>
                    <Button type="button" onClick={() => handleFavoriteClick(restaurantId)} icon="favorite" isActive={isLiked ? true : false} />
                </div>
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default RestaurantPopup;
