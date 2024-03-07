import styles from './ButtonElement.module.scss';

type ButtonElementProps = {
    text: string;
    isActive: boolean;
    action: () => void;
};

const ButtonElement = (props: ButtonElementProps) => {
    return (
        <label className={`${styles.button_element} ${props.isActive ? styles.button_element_active : ''}`}>
            <input className={styles.button_element_input} type="checkbox" defaultChecked={false} onChange={props.action}  />
            <span className={`${styles.button_element_text} ${props.isActive ? styles.button_element_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default ButtonElement;
