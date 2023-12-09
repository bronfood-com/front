import GuestNavigation from './GuestNavigation/GuestNavigation';
import CustomerNavigation from './CustomerNavigation/CustomerNavigation';

/**
 * Contains 2 menu types: guest/customer
 */
const Navigation = () => {

    type UserRole = 'guest' | 'customer' | 'catering';
    const userRole: UserRole = 'guest';

    const navigation = userRole === 'guest' ? GuestNavigation : CustomerNavigation;

    return <nav> {navigation()} </nav>;
};

export default Navigation;
