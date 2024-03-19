import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonB.module.scss';

/* Can be any button from this design: https://www.figma.com/file/9H7H1cGkW9CYB7iFRpm7x3/bronfood.com?type=design&node-id=222-4281&mode=design&t=ZP4xbFL1UkoD1zb6-4 */

interface ButtonBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'add';
}

const ButtonB: FC<ButtonBProps> = ({ isActive = false, icon = 'close', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_b}
                ${styles[`button_b__icon_${icon}`]}
                ${isActive ? styles.button_b_active : ''}
                ${icon === 'close' ? styles.button_b_wide : ''}
            `}
        />
    );
};

export default ButtonB;
