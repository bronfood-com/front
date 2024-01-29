import { FC, ReactNode } from 'react';
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
}

const Button: FC<Button> = (props) => {
    const { disabled } = props;
    return (
        <button type="submit" disabled={disabled} className={`${styles.button}  ${disabled ? styles.button_disabled : ''}`}>
            {props.children}
        </button>
    );
};

export default Button;
