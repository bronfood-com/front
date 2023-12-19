import GuestNavigation from './GuestNavigation/GuestNavigation';
import CustomerNavigation from './CustomerNavigation/CustomerNavigation';
import { FC } from 'react';

/**
 * Contains 2 menu types: guest/customer
 */
interface Navigation {
    /**
     * Click on menu item redirects to link and close menu
     */
    handleItemMenuClick: React.MouseEventHandler<HTMLElement>;
    /**
     * Login status. When true, the user is logged in
     */
    isLogin: boolean;
}
const Navigation: FC<Navigation> = (props) => {
    type UserRole = 'guest' | 'customer' | 'catering';
    const userRole: UserRole = props.isLogin ? 'customer' : 'guest';
    const navigation = userRole === 'guest' ? <GuestNavigation handleItemMenuClick={props.handleItemMenuClick} /> : <CustomerNavigation handleItemMenuClick={props.handleItemMenuClick} />;
    return <nav> {navigation} </nav>;
};

export default Navigation;
