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

const ButtonDelete: FC<ButtonDeleteProps> = ({ isActive = false, icon = 'close', position = { top: 0, right: 0, bottom: 0, left: 0 }, opacity = '100%', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_delete}
                ${styles[`button_delete__icon_${isActive ? `${icon}_active` : icon}`]}
            `}
            style={{
                border: icon === 'delete' && isActive ? '1px solid #F05252' : '',
                backgroundColor: !isActive ? '#fff' : icon === 'delete' ? '#F052524D' : '#F5F5F5',
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
