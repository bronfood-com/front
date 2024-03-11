import { RestaurantsProvider } from '../../contexts/RestaurantsContext';
import Drawer from './Drawer/Drawer';

function Restaurants() {
    return (
        <RestaurantsProvider>
            <Drawer />;
        </RestaurantsProvider>
    );
}

export default Restaurants;
