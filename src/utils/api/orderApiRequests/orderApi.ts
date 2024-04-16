// link to contract: https://www.notion.so/API-Restaurant-Meal-Basket-Order-e7947e0efa5948238032620646f28890
import { OrderState } from '../orderService/orderService';

const baseUrl = 'http://localhost:3001';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

async function fetchResponse<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return { data: null, error: `Error ${response.status}` };
        }
        const data: T = await response.json();
        return { data: data, error: null };
    } catch (error) {
        const e = error as Error;
        return { data: null, error: e.message || 'An unexpected error occurred' };
    }
}

export const fetchOrderIdByClientId = async (clientId: string): Promise<ApiResponse<string>> => {
    const response = await fetchResponse<{ id: string }[]>(`${baseUrl}/orders?clientId=${clientId}`);
    if (response.error || response.data === null || response.data.length === 0) {
        return { data: null, error: response.error || 'No orders found for this client' };
    }
    return { data: response.data[0].id, error: null };
};

export const fetchOrderDetailsByOrderId = async (id: string): Promise<ApiResponse<OrderState>> => {
    const response = await fetchResponse<OrderState[]>(`${baseUrl}/orders?id=${id}`);
    if (response.error || response.data === null || response.data.length === 0) {
        return { data: null, error: response.error || 'Order details not found' };
    }
    return { data: response.data[0], error: null };
};

export const cancelOrder = async (id: string): Promise<ApiResponse<void>> => {
    const body = JSON.stringify({
        cancellationStatus: 'requested',
        isCancellationRequested: true,
    });

    const response = await fetch(`${baseUrl}/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    });

    if (!response.ok) {
        return { data: null, error: `Error canceling the order with status ${response.status}` };
    }
    return { data: null, error: null };
};
