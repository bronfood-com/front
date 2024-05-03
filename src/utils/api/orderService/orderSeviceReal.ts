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
                errorData.key === 'UserIsAlreadyRegistered' // example error according to backend
                    ? 'User is already registered'
                    : `Error ${response.status}`;
            return { data: null, error: errorMessage };
        }
        const data: T = await response.json();
        return { data, error: null };
    }

    async fetchOrderIdByClientId(clientId: string): Promise<ApiResponse<string>> {
        const response = await this.fetchResponse<{ id: string }[]>(`${API_URL}/orders?clientId=${clientId}`);
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
        const response = await fetch(`${API_URL}/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cancellationStatus: 'requested', isCancellationRequested: true }),
        });
        if (!response.ok) {
            return { data: null, error: `Error canceling the order with status ${response.status}` };
        }
        return { data: null, error: null };
    }
}

export const apiClient = new ApiOrder();
