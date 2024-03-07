import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RestaurantCard from '../../../components/Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import Filter from '../Filter/Filter';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { restaurantsFiltered } = useRestaurants();
    const { t } = useTranslation();
    const container = useRef(null);
    return (
        <div className={`${styles.drawer} ${styles.up} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className={styles.drawer__line_container}>
                    <div className={`${styles.drawer__line} ${isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{t('pages.restaurants.selectPlace')}</p>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        type="button"
                        className={styles.drawer__icon}
                    />
                </div>
                <ul ref={container} className={styles.drawer__list}>
                    {restaurantsFiltered.map((card) => (
                        <li key={card.id} className={styles.drawer__list_item}>
                            <RestaurantCard card={card} isTheOnlyOne={restaurantsFiltered.length === 1} container={container} />
                        </li>
                    ))}
                </ul>
            </div>
            {isFilterOpen && <Filter close={() => setIsFilterOpen(false)} />}
        </div>
    );
};

export default Drawer;
