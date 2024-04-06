import { OrderState } from '../../../interfaces/OrderInterface';
import { fetchOrderDetailsByOrderId, fetchOrderIdByClientId } from '../../api/order/orderApi';

export async function fetchOrder(clientId: string, setOrderDetails: (details: OrderState | null) => void, setPreparationTime: (time: number) => void) {
    try {
        const fetchedOrderId = await fetchOrderIdByClientId(clientId);
        if (fetchedOrderId) {
            const details = await fetchOrderDetailsByOrderId(fetchedOrderId);
            if (details) {
                setOrderDetails(details);
                setPreparationTime(details.preparationTime);
            }
        }
    } catch (error) {
        throw new Error('Error retrieving order data:');
    }
}
