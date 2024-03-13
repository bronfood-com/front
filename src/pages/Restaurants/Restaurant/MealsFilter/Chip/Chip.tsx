import styles from './Chip.module.scss';
import food from '../../../../../vendor/images/restaurant/food.png'
import drink from '../../../../../vendor/images/restaurant/drink.png'
import dessert from '../../../../../vendor/images/restaurant/desert.png'

type ChipProps = {
    /**
     * Text displayed on HTML element
     */
    text: string;
    /**
     * Icon displayed inside HTML element
     */
    icon: 'food' | 'drink' | 'dessert';
    /**
     * Determines whether chip is selected by user
     */
    isActive: boolean;
    /**
     * Fires when user clicks on venue's type. Sets type selected
     */
    add: () => void;
    /**
     * Fires when user clicks on venue's type. Sets type deselected
     */
    delete: () => void;
};

const Chip = (props: ChipProps) => {
    const handleChange = () => {
        if (props.isActive) {
            props.delete();
        } else {
            props.add();
        }
    };
    return (
        <label className={`${styles.chip} ${props.isActive ? styles.chip_active : ''}`}>
            <input className={styles.chip_input} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <div className={styles.chip_icon} style={{backgroundImage: `url(${props.icon === 'food' ? food : props.icon === 'drink' ? drink : dessert  })`}} />
            <span className={`${styles.chip_text} ${props.isActive ? styles.chip_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default Chip;
