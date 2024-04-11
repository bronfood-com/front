import WaitingOrder from '../../components/WaitingOrder/WaitingOrder';
import { OrderProvider } from '../../contexts/OrderContext';
import { useOrderContext } from '../../utils/hooks/useOrderContext/useOrderContext';
import PopupOrderCancelled from '../PopupOrderCancelled/PopupOrderCancelled';

const WaitingOrderPage = () => {
    const { showConfirmationPopup } = useOrderContext();

    return (
        <>
            <OrderProvider clientId="clientId1">
                <WaitingOrder />
                {showConfirmationPopup && <PopupOrderCancelled />}
            </OrderProvider>
        </>
    );
};

export default WaitingOrderPage;
