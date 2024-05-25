import styles from './Search.module.scss';
import Filter from '../../components/Filter/Filter';

const Search = () => {
    return (
        <div className={styles.search}>
            <Filter />
        </div>
    );
};

export default Search;
