import styles from './OptionElement.module.scss';

type OptionProps = {
    selected: boolean;
    text: string;
    action: () => void;
};

const OptionElement = (props: OptionProps) => {
    return (
        <button type="button" onClick={!props.selected ? props.action : undefined} className={`${styles.option} ${props.selected ? styles.option_selected : ''}`}>
            <p className={styles.option__text}>{props.text}</p>
            <button type="button" onClick={props.action} className={`${styles.option__icon} ${props.selected ? styles.option__icon_visible : ''}`} />
        </button>
    );
};

export default OptionElement;
