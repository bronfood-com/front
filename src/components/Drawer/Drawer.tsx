import RestaurantCard from '../Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import { Restaurant } from '../../pages/Restaurants/MockRestaurantsList';

enum DrawerDirection {
    up = 'up',
    down = 'down',
}

type Props = {
    isOpen: boolean;
    title: string;
    list: Restaurant[];
    direction?: DrawerDirection;
    toggleDrawer: () => void;
    openFilter: () => void;
    openListItem: () => void;
};

const Drawer = ({ isOpen, title, list, direction = DrawerDirection.up, toggleDrawer, openFilter, openListItem }: Props) => {
    return (
        <div className={`${styles.drawer} ${styles[direction]} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button onClick={toggleDrawer} type="button" className={styles.drawer__line_container}>
                    <div className={`${styles.drawer__line} ${isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{title}</p>
                    <button onClick={openFilter} className={styles.drawer__icon} />
                </div>
                <ul className={styles.drawer__list}>
                    {list.map((card) => (
                        <li key={card.id}>
                            <RestaurantCard onClick={openListItem} card={card} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
