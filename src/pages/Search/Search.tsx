import styles from './Search.module.scss';
import Filter from '../../components/Filter/Filter';
import RestaurantCard from '../../components/Cards/RestaurantCard/RestaurantCard';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';

const Search = () => {
    const navigate = useNavigate();
    const { restaurantsFiltered } = useRestaurants();

    return (
        <div className={styles.search}>
            <Filter
                close={() => navigate('/')}
                children={
                    <ul className={styles.search__list}>
                        {restaurantsFiltered.map((card) => (
                            <li key={card.id} className={styles.search__list_item}>
                                <RestaurantCard card={card} isTheOnlyOne={restaurantsFiltered.length === 1} />
                            </li>
                        ))}
                    </ul>
                }
            />
        </div>
    );
};

export default Search;
