import styles from './ButtonElement.module.scss';

type ButtonElementProps = {
    text: string;
    isActive: boolean;
    action: () => void;
};

const ButtonElement = (props: ButtonElementProps) => {
    return (
        <button type="button" onClick={() => props.action()} className={`${styles.button_element} ${props.isActive ? styles.button_element_active : ''}`}>
            <p className={`${styles.button_element_text} ${props.isActive ? styles.button_element_text_active : ''}`}>{props.text}</p>
        </button>
    );
};

export default ButtonElement;
