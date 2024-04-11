import { useContext } from 'react';
import { OrderContext } from '../../../contexts/OrderContext';

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrderContext must be used within a OrderProvider');
    }
    return context;
};
