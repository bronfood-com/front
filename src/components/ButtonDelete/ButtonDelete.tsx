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

const ButtonDelete: FC<ButtonDeleteProps> = ({
    isActive = false,
    icon = 'close',
    position = { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    opacity = '100%',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_delete}
                ${styles[`button_delete__icon_${isActive && (icon === 'delete' || icon === 'favorite') ? `${icon}_active` : icon }`]}
                ${(isActive && icon === 'delete') ? styles.button_delete_outlined : ''}
                ${!isActive ? styles.button_delete__background_white :
                icon === 'delete' ? styles.button_delete__background_red : styles.button_delete__background_grey}
            `}
            style={{
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
