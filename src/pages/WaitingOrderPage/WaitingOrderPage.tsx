import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { OrderProvider } from '../../contexts/OrderContext';
import WaitingOrder from './WaitingOrder/WaitingOrder';

const WaitingOrderPage = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const userId = currentUser?.userId;

    return (
        <>
            {userId && (
                <OrderProvider userId={userId}>
                    <WaitingOrder />
                </OrderProvider>
            )}
        </>
    );
};

export default WaitingOrderPage;
