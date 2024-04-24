import { OrderProvider } from '../../contexts/OrderContext';
import WaitingOrder from './WaitingOrder/WaitingOrder';

const WaitingOrderPage = () => {
    return (
        <>
            <OrderProvider clientId="clientId1">
                <WaitingOrder />
            </OrderProvider>
        </>
    );
};

export default WaitingOrderPage;
