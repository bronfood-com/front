import styles from './Search.module.scss';
import Filter from '../../components/Filter/Filter';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.search}>
            <Filter close={() => navigate('/')} />
        </div>
    );
};

export default Search;
