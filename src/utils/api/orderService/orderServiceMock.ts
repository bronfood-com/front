import { OrderState } from './orderService';
import { mockData } from '../../../pages/WaitingOrderPage/MockOrderList';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

class OrderServiceMock {
    _delayedResponse = async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    _fetchResponse = async <T>(query: () => T | undefined, errorMessage: string): Promise<ApiResponse<T>> => {
        const result = query();
        if (result) {
            return { data: result, error: null };
        }
        return { data: null, error: errorMessage };
    };

    fetchOrderIdByUserId = async (userId: string): Promise<ApiResponse<string>> => {
        return this._fetchResponse(() => mockData.orders.find((order) => order.userId === userId)?.id, 'No confirmed orders found for this client');
    };

    fetchOrderedMealByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
        return this._fetchResponse(() => mockData.orders.find((order) => order.id === id), 'Order details not found');
    };

    cancelOrder = async (id: string): Promise<ApiResponse<void>> => {
        const orderExists = mockData.orders.some((order) => order.id === id);
        if (!orderExists) {
            return { data: null, error: 'Error canceling the order' };
        }

        return { data: null, error: null };
    };
}

export default OrderServiceMock;
