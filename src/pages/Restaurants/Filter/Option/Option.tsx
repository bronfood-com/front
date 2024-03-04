import styles from './Option.module.scss';

type OptionProps = {
    selected: boolean;
    text: string;
    action: () => void;
};

const OptionElement = (props: OptionProps) => {
    return (
        <div onClick={!props.selected ? props.action : undefined} className={`${styles.option} ${props.selected ? styles.option_selected : ''}`}>
            <p className={styles.option__text}>{props.text}</p>
            <button type="button" onClick={props.action} className={`${styles.option__icon} ${props.selected ? styles.option__icon_visible : ''}`} />
        </div>
    );
};

export default OptionElement;
