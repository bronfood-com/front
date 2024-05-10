import i18n from 'i18next';
import { mockData } from './MockOrderList';
import { OrderState } from './orderService';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

class OrderServiceMock {
    _delayedResponse = async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    _fetchResponse = async <T>(query: () => T | undefined, errorMessageKey: string): Promise<ApiResponse<T>> => {
        const result = query();
        if (result) {
            return { data: result, error: null };
        }
        return { data: null, error: i18n.t(errorMessageKey) };
    };

    fetchOrderIdByUserId = async (userId: string): Promise<ApiResponse<string>> => {
        return this._fetchResponse(() => mockData.orders.find((order) => order.userId === userId)?.id, 'components.waitingOrder.orderDoesNotExist');
    };

    fetchOrderedMealByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
        return this._fetchResponse(() => mockData.orders.find((order) => order.id === id), 'components.waitingOrder.errorReceivingOrderData');
    };

    cancelOrder = async (id: string): Promise<ApiResponse<void>> => {
        await this._delayedResponse(2000);

        const orderExists = mockData.orders.some((order) => order.id === id);
        if (!orderExists) {
            return { data: null, error: 'components.waitingOrder.errorWhileCancellingTheOrder' };
        }

        return { data: null, error: null };
    };
}

export default OrderServiceMock;
