import { useRef, useState } from 'react';
import RestaurantCard from '../../../components/Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import { Restaurant } from '../MockRestaurantsList';
import Filter from '../Filter/Filter';

type DrawerProps = {
    isOpen: boolean;
    title: string;
    list: Restaurant[];
    options: [];
    toggleDrawer: () => void;
    openListItem: () => void;
};

const Drawer = ({ isOpen, title, list, options, toggleDrawer, openListItem }: DrawerProps) => {
    const container = useRef(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    return (
        <div className={`${styles.drawer} ${styles.up} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button onClick={toggleDrawer} type="button" className={styles.drawer__line_container}>
                    <div className={`${styles.drawer__line} ${isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{title}</p>
                    <button onClick={() => setIsFilterOpen(true)} className={styles.drawer__icon} />
                </div>
                <ul ref={container} className={styles.drawer__list}>
                    {list.map((card) => (
                        <li key={card.id} className={styles.drawer__list_item}>
                            <RestaurantCard onClick={openListItem} card={card} container={container} />
                        </li>
                    ))}
                </ul>
            </div>
            {isFilterOpen && <Filter options={options} close={() => setIsFilterOpen(false)} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />}
        </div>
    );
};

export default Drawer;
