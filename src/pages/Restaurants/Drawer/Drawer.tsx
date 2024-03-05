import { useRef } from 'react';
import RestaurantCard from '../../../components/Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import { Restaurant } from '../MockRestaurantsList';

type DrawerProps = {
    isOpen: boolean;
    title: string;
    list: Restaurant[];
    toggleDrawer: () => void;
    openFilter: () => void;
    openListItem: () => void;
};

const Drawer = ({ isOpen, title, list, toggleDrawer, openFilter, openListItem }: DrawerProps) => {
    const container = useRef(null);
    return (
        <div className={`${styles.drawer} ${styles.up} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button onClick={toggleDrawer} type="button" className={styles.drawer__line_container}>
                    <div className={`${styles.drawer__line} ${isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{title}</p>
                    <button onClick={openFilter} className={styles.drawer__icon} />
                </div>
                <ul ref={container} className={styles.drawer__list}>
                    {list.map((card) => (
                        <li key={card.id} className={styles.drawer__list_item}>
                            <RestaurantCard onClick={openListItem} card={card} container={container} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
