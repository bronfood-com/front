import { OrderState } from './orderService';
import mockData from './orderServiceMock.json';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

export const fetchOrderIdByClientId = async (clientId: string): Promise<ApiResponse<string>> => {
    const orders = mockData.orders.filter((order) => order.clientId === clientId);
    if (orders.length === 0) {
        return { data: null, error: 'No orders found for this client' };
    }
    return { data: orders[0].id, error: null };
};

export const fetchOrderDetailsByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
    const order = mockData.orders.find((order) => order.id === id);
    if (!order) {
        return { data: null, error: 'Order details not found' };
    }
    return { data: order, error: null };
};

export const cancelOrder = async (id: string): Promise<ApiResponse<void>> => {
    const order = mockData.orders.find((order) => order.id === id);
    if (!order) {
        return { data: null, error: 'Error canceling the order' };
    }
    return { data: null, error: null };
};
