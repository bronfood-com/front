import { FC } from 'react';
import styles from './Button.module.scss';

interface Button {
    buttonName: string;
}

const Button: FC<Button> = (props) => {
    return (
        <button type="submit" className={styles.button}>
            {props.buttonName}
        </button>
    );
};

export default Button;
