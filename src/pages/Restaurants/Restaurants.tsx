import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from './Drawer/Drawer';
import { mockRestaurants } from './MockRestaurantsList';

function Restaurants() {
    const { t } = useTranslation();
    const restaurants = mockRestaurants;
    const options = useMemo(() => {
        let id = 1;
        const array = [];
        restaurants.forEach((restaurant) => {
            restaurant.meals.forEach((meal) => {
                array.push({ id: id++, name: meal.name });
            });
        });
        return array;
    }, [restaurants]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const handleRestaurantClick = () => {};
    return (
        <>
            <Drawer isOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} openListItem={handleRestaurantClick} title={t('pages.restaurants.selectPlace')} list={restaurants} options={options}></Drawer>;
        </>
    );
}

export default Restaurants;
