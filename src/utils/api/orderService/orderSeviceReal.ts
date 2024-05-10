import { OrderState } from './orderService';
import { API_URL } from '../../consts';
import i18n from 'i18next';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

class OrderServiceReal {
    async fetchResponse<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = i18n.t(`components.waitingOrder.${errorData.key}`);
            return { data: null, error: errorMessage };
        }
        const data: T = await response.json();
        return { data, error: null };
    }

    async fetchOrderIdByUserId(userId: string): Promise<ApiResponse<string>> {
        const response = await this.fetchResponse<{ id: string }[]>(`${API_URL}/orders?clientId=${userId}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: 'orderDoesNotExist' };
        }
        return { data: response.data[0].id, error: null };
    }

    async fetchOrderedMealByOrderId(id: string): Promise<ApiResponse<OrderState>> {
        const response = await this.fetchResponse<OrderState[]>(`${API_URL}/orders?id=${id}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: 'errorReceivingOrderData' };
        }
        return { data: response.data[0], error: null };
    }

    async cancelOrder(id: string): Promise<ApiResponse<void>> {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cancellationStatus: 'requested', isCancellationRequested: true }),
        };
        const response = await this.fetchResponse<void>(`${API_URL}/orders/${id}`, options);
        if (response.error) {
            return { data: null, error: 'errorWhileCancellingTheOrder' };
        }
        return { data: null, error: null };
    }

}

export default OrderServiceReal;
