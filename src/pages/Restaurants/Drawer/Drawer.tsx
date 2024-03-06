import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import RestaurantCard from '../../../components/Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import Filter from '../Filter/Filter';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';

const Drawer = () => {
    const { drawer, filter, restaurantsFiltered } = useRestaurants();
    const { t } = useTranslation();
    const container = useRef(null);
    return (
        <div className={`${styles.drawer} ${styles.up} ${drawer.isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button onClick={drawer.toggle} type="button" className={styles.drawer__line_container}>
                    <div className={`${styles.drawer__line} ${drawer.isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{t('pages.restaurants.selectPlace')}</p>
                    <button onClick={filter.open} className={styles.drawer__icon} />
                </div>
                <ul ref={container} className={styles.drawer__list}>
                    {restaurantsFiltered.map((card) => (
                        <li key={card.id} className={styles.drawer__list_item}>
                            <RestaurantCard card={card} isTheOnlyOne={restaurantsFiltered.length === 1} container={container} />
                        </li>
                    ))}
                </ul>
            </div>
            {filter.isOpen && <Filter />}
        </div>
    );
};

export default Drawer;
