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

const ButtonHeader: FC<ButtonHeaderProps> = ({
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
                ${styles.button_header}
                ${styles[`button_header__icon_${icon}`]}
                ${isActive ? styles.button_header_active : ''}
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

export default ButtonHeader;
