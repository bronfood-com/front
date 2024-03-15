import styles from './ChipWithIcon.module.scss'
import food from '../../../../../vendor/images/restaurant/food.png';
import drink from '../../../../../vendor/images/restaurant/drink.png';
import dessert from '../../../../../vendor/images/restaurant/desert.png';

type ChipWithIconProps = {
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

const ChipWithIcon = (props: ChipWithIconProps) => {
    const handleChange = () => {
        if (props.isActive) {
            props.delete();
        } else {
            props.add();
        }
    };
    return (
        <label className={`${styles.chip_with_icon} ${props.isActive ? styles.chip_with_icon_active : ''}`}>
            <input className={styles.chip_with_icon_input} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <div className={styles.chip_with_icon_icon} style={{ backgroundImage: `url(${props.icon === 'food' ? food : props.icon === 'drink' ? drink : dessert})` }} />
            <span className={`${styles.chip_with_icon_text} ${props.isActive ? styles.chip_with_icon_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default ChipWithIcon;
