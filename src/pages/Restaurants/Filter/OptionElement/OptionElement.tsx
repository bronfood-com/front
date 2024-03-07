import styles from './OptionElement.module.scss';

type OptionProps = {
    selected: boolean;
    text: string;
    onClick: () => void;
};

const OptionElement = (props: OptionProps) => {
    return (
        <div onClick={!props.selected ? props.onClick : undefined} className={`${styles.option} ${props.selected ? styles.option_selected : ''}`}>
            <p className={styles.option__text}>{props.text}</p>
            <button type="button" onClick={props.onClick} className={`${styles.option__icon} ${props.selected ? styles.option__icon_visible : ''}`} />
        </div>
    );
};

export default OptionElement;
