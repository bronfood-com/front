import { useState } from 'react';
import styles from './ButtonElement.module.scss';

type ButtonElementProps = {
    text: string;
    turnOn: () => void;
    turnOff: () => void;
};

const ButtonElement = (props: ButtonElementProps) => {
    const [isActive, setIsActive] = useState();
    const handleClick = () => {
        if (isActive) {
            props.turnOff();
        } else {
            props.turnOn();
        }
        setIsActive(!isActive);
    };
    return (
        <button type="button" onClick={handleClick} className={`${styles.button_element} ${isActive ? styles.button_element_active : ''}`}>
            <p className={`${styles.button_element_text} ${isActive ? styles.button_element_text_active : ''}`}>{props.text}</p>
        </button>
    );
};

export default ButtonElement;
