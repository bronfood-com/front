import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonDelete.module.scss';

interface ButtonDeleteProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'edit' | 'back' | 'favorite' | 'delete';
}

const ButtonDelete: FC<ButtonDeleteProps> = ({ isActive = false, icon = 'close', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_delete}
                ${styles[`button_delete__icon_${isActive && (icon === 'delete' || icon === 'favorite') ? `${icon}_active` : icon}`]}
                ${isActive && icon === 'delete' ? styles.button_delete_outlined : ''}
                ${!isActive ? styles.button_delete__background_white : icon === 'delete' ? styles.button_delete__background_red : styles.button_delete__background_grey}
            `}
        />
    );
};

export default ButtonDelete;
