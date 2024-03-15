import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonDelete.module.scss';
import close from '../../vendor/images/icons/delete/close.svg';
import edit from '../../vendor/images/icons/delete/Edit.svg';
import back from '../../vendor/images/icons/delete/back.svg';
import favorite from '../../vendor/images/icons/delete/favorite.svg';
import delete_default from '../../vendor/images/icons/delete/Delete.svg';
import deleteActive from '../../vendor/images/icons/delete/delete_active.svg';
import favoriteActive from '../../vendor/images/icons/delete/favorite_active.svg';

interface ButtonDeleteProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'edit' | 'back' | 'favorite' | 'delete';
    /**
     * Button's position relative to closest positioned parent
     */
    position?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    /**
     * Button's opacity
     */
    opacity?: string;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({ isActive = false, icon = 'close', position = { top: 0, right: 0, bottom: 0, left: 0 }, opacity = '100%', ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={`${styles.button_delete}`}
            style={{
                backgroundColor: !isActive ? '#fff' : icon === 'delete' ? '#F052524D' : '#F5F5F5',
                backgroundImage: `url(${
                    icon === 'close' ? close :
                    icon === 'edit' ? edit :
                    icon === 'back' ? back :
                    icon === 'favorite' && !isActive ? favorite :
                    icon === 'favorite' && isActive ? favoriteActive :
                    icon === 'delete' && !isActive ? delete_default :
                    icon === 'delete' && isActive ? deleteActive : ''
                })`,
                opacity,
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                left: position.left,
            }}
        />
    );
};

export default ButtonDelete;
