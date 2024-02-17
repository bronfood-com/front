import { FC, MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Button {
    /**
     * Text on button
     */
    children?: ReactNode;
    /**
     * Active button
     */
    disabled?: boolean;
    /**
     * Click event handler
     */
    onClick?: MouseEventHandler;
}

const Button: FC<Button> = (props) => {
    const { disabled, onClick } = props;
    return (
        <button type="submit" onClick={onClick} disabled={disabled} className={`${styles.button} ${disabled ? styles.button_disabled : ''}`}>
            {props.children}
        </button>
    );
};

export default Button;
