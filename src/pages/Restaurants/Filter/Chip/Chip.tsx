import styles from './Chip.module.scss';

type ChipProps = {
    text: string;
    isActive: boolean;
    onClick: () => void;
};

const Chip = (props: ChipProps) => {
    return (
        <label className={`${styles.button_element} ${props.isActive ? styles.button_element_active : ''}`}>
            <input className={styles.button_element_input} type="checkbox" defaultChecked={false} onChange={props.onClick} />
            <span className={`${styles.button_element_text} ${props.isActive ? styles.button_element_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default Chip;
