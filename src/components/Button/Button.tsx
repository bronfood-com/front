import { FC } from 'react';
import styles from './Button.module.scss';

interface Button {
    /**
     * Text on button
     */
    children: string;
}

const Button: FC<Button> = (props) => {
    return (
        <button type="submit" className={styles.button}>
            {props.children}
        </button>
    );
};

export default Button;
