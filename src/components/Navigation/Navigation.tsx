import styles from './Navigation.module.scss';
import GuestNavigation from './GuestNavigation/GuestNavigation';
import CustomerNavigation from './CustomerNavigation/CustomerNavigation';

/**
 * Contains 4 menu types. For change --> set useState on TRUE (guest, client, catering, cashier)
 */
const Navigation = () => {

    type UserRole = 'guest' | 'customer' | 'catering';
    const userRole: UserRole = 'customer';

    const renderNavigation = (userRole: UserRole) => {
        if (userRole === 'guest') {
            return <GuestNavigation />;
        } else {
            return <CustomerNavigation />;
        }
    };

    return <nav className={styles.nav}>{renderNavigation(userRole)}</nav>;
};

export default Navigation;
