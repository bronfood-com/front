import { Outlet } from 'react-router-dom';
import { RestaurantsProvider } from '../../contexts/RestaurantsContext';
import Drawer from './Drawer/Drawer';

function Restaurants() {
    return (
        <RestaurantsProvider>
            <Drawer />
            <Outlet />
        </RestaurantsProvider>
    );
}

export default Restaurants;
