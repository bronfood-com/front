import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from './Drawer/Drawer';
import { restaurants } from './MockRestaurantsList';
import { Outlet, useNavigate } from 'react-router-dom';

function Restaurants() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const handleFilterClick = () => {
        navigate('filter');
    };
    const handleRestaurantClick = () => {};
    return (
        <>
            <Drawer isOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} openFilter={handleFilterClick} openListItem={handleRestaurantClick} title={t('pages.restaurants.selectPlace')} list={restaurants} />;
            <Outlet />
        </>
    );
}

export default Restaurants;
