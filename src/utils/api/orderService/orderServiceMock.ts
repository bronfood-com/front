import { OrderState } from './orderService';
import { mockData } from '../../../pages/WaitingOrderPage/MockOrderList';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

export const fetchOrderIdByUserId = async (userId: string): Promise<ApiResponse<string>> => {
    // Имитация задержки ответа и фильтрация по userId
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const order = mockData.orders.find((order) => order.userId === userId);
    return order ? { data: order.id, error: null } : { data: null, error: 'No confirmed orders found for this client' };
};

export const fetchOrderedMealByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
    // Имитация задержки ответа и фильтрация по orderId
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const order = mockData.orders.find((order) => order.id === id);
    return order ? { data: order, error: null } : { data: null, error: 'Order details not found' };
};

// export const fetchOrderIdByUserId = async (userId: string): Promise<ApiResponse<string>> => {
//     // timeout to simulate waiting for order confirmation
//     await new Promise((resolve) => setTimeout(resolve, 4000));

//     const orders = mockData.orders.filter((order) => order.userId === userId);
//     if (orders.length === 0) {
//         return { data: null, error: 'No orders found for this client' };
//     }
//     return { data: orders[0].id, error: null };
// };

// export const fetchOrderedMealByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
//     // timeout to simulate waiting for order confirmation
//     await new Promise((resolve) => setTimeout(resolve, 4000));

//     const order = mockData.orders.find((order) => order.id === id);
//     if (!order) {
//         return { data: null, error: 'Order details not found' };
//     }
//     return { data: order, error: null };
// };

export const cancelOrder = async (id: string): Promise<ApiResponse<void>> => {
    const order = mockData.orders.find((order) => order.id === id);
    if (!order) {
        return { data: null, error: 'Error canceling the order' };
    }
    return { data: null, error: null };
};
