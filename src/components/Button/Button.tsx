import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Button {
    /**
     * Text on button
     */
    children?: ReactNode;
}

const Button: FC<Button> = (props) => {
    return (
        <button type="submit" className={styles.button}>
            {props.children}
        </button>
    );
};

export default Button;
