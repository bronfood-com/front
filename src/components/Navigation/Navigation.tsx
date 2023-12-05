import { useState } from 'react';
import styles from './Navigation.module.scss';
import GuestNavigation from './GuestNavigation/GuestNavigation';
import CustomerNavigation from './CustomerNavigation/CustomerNavigation';
import CateringNavigation from './CateringNavigation/CateringNavigation';
import CashierNavigation from './CashierNavigation/CashierNavigation';

/**
 * Contains 4 menu types. For change --> set useState on TRUE (guest, client, catering, cashier)
 */
const Navigation = () => {
    const [isGuest] = useState(true);
    const [isCustomer] = useState(false);
    const [isCatering] = useState(false);
    const [isCashier] = useState(false);

    return <nav className={styles.nav}>{isGuest ? <GuestNavigation /> : isCustomer ? <CustomerNavigation /> : '' || isCatering ? <CateringNavigation /> : '' || isCashier ? <CashierNavigation /> : ''}</nav>;
};

export default Navigation;
