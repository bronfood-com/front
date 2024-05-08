import { OrderState } from './orderService';
import { API_URL } from '../../consts';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

class ApiOrder {
    async fetchResponse<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage =
                errorData.key === 'UserIsAlreadyRegistered' // example error according to backend contract
                    ? 'User is already registered' // example error
                    : `Error ${response.status}`;
            return { data: null, error: errorMessage };
        }
        const data: T = await response.json();
        return { data, error: null };
    }

    async fetchOrderIdByUserId(userId: string): Promise<ApiResponse<string>> {
        const response = await this.fetchResponse<{ id: string }[]>(`${API_URL}/orders?clientId=${userId}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: response.error || 'No orders found for this client' };
        }
        return { data: response.data[0].id, error: null };
    }

    async fetchOrderedMealByOrderId(id: string): Promise<ApiResponse<OrderState>> {
        const response = await this.fetchResponse<OrderState[]>(`${API_URL}/orders?id=${id}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: response.error || 'Order details not found' };
        }
        return { data: response.data[0], error: null };
    }

    async cancelOrder(id: string): Promise<ApiResponse<void>> {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cancellationStatus: 'requested', isCancellationRequested: true }),
        };
        return this.fetchResponse<void>(`${API_URL}/orders/${id}`, options);
    }
}

export const apiClient = new ApiOrder();
