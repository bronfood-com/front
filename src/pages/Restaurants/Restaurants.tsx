import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from '../../components/Drawer/Drawer';
import { restaurants } from './MockRestaurantsList';


function Restaurants() {
    const { t } = useTranslation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <>
            <Drawer
                isOpen={isDrawerOpen}
                toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                openFilter={() => setIsFilterOpen(!isFilterOpen)}
                title={t('pages.restaurants.title')}
                list={restaurants}
            />
        </>
    );
}

export default Restaurants;