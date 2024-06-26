import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RestaurantCard from '../../../components/Cards/RestaurantCard/RestaurantCard';
import styles from './Drawer.module.scss';
import Filter from '../../../components/Filter/Filter';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import Preloader from '../../../components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';
import PageNotFound from '../../PageNotFound/PageNotFound';
import { useCurrentUser } from '../../../utils/hooks/useCurrentUser/useCurretUser';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { restaurantsFiltered, isLoading, isError, refetch } = useRestaurants();
    const { t } = useTranslation();
    const container = useRef(null);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState('');
    const { setActiveRestaurant } = useRestaurants();

    useEffect(() => {
        setActiveRestaurant(isClicked);
    }, [isClicked, setActiveRestaurant]);

    const handleClick = (id: string) => {
        isClicked === id ? navigate(`/restaurants/${id}`) : setIsClicked(id);
    };

    const { currentUser } = useCurrentUser();

    useEffect(() => {
        if (!currentUser) {
            navigate(`/`);
        } else {
            refetch();
        }
    }, [currentUser, navigate, refetch]);

    if (isError) {
        return <PageNotFound />;
    } else {
        return (
            <div className={`${styles.drawer} ${styles.up} ${isOpen ? styles.open : ''}`}>
                <div className={styles.drawer__container}>
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className={styles.drawer__tab_container}>
                        <div className={`${styles.drawer__tab} ${isOpen ? styles.drawer__tab_active : styles.drawer__tab_disabled}`} />
                    </button>
                    <div className={styles.drawer__title_container}>
                        <p className={styles.drawer__title}>{t('pages.restaurants.selectPlace')}</p>
                        <button onClick={() => setIsFilterOpen(true)} type="button" className={styles.drawer__icon} title={t('pages.restaurants.filters')} />
                    </div>
                    {isLoading && <Preloader />}
                    <ul ref={container} className={styles.drawer__list}>
                        {restaurantsFiltered.map((card) => (
                            <li key={card.id} className={styles.drawer__list_item} onClick={() => handleClick(card.id)}>
                                <RestaurantCard card={card} isTheOnlyOne={restaurantsFiltered.length === 1} container={container} />
                            </li>
                        ))}
                    </ul>
                </div>
                {isFilterOpen && <Filter name="filters" close={() => setIsFilterOpen(false)} />}
            </div>
        );
    }
};
export default Drawer;
