import { useState } from 'react';

import Drawer from '../../components/Drawer/Drawer';

function Restaurants() {
    /* const { isLogin } = useCurrentUser();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { t } = useTranslation();

    const handleMenuActive = () => {
        setIsMenuActive(!isMenuActive);
    }; */
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <Drawer isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(!isDrawerOpen)} title='Выберите заведение'>
            </Drawer>
        </>
    );
}

export default Restaurants
