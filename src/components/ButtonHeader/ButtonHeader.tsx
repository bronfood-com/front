import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonHeader.module.scss';

interface ButtonHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'add';
}

const ButtonHeader: FC<ButtonHeaderProps> = ({ isActive = false, icon = 'close', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_header}
                ${styles[`button_header__icon_${icon}`]}
                ${isActive ? styles.button_header_active : ''}
                ${icon === 'close' ? styles.button_header_wide : ''}
            `}
        />
    );
};

export default ButtonHeader;
