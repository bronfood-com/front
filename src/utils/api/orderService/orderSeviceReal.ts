import { OrderState } from './orderService';
import { API_URL } from '../../consts';
import i18n from 'i18next';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

class OrderServiceReal {
    async _fetchResponse<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = i18n.t(`components.waitingOrder.${errorData.key}`);
                return { data: null, error: errorMessage };
            }
            const data: T = await response.json();
            return { data, error: null };
        } catch (error) {
            return { data: null, error: i18n.t('errors.anUnexpectedErrorHasOccurred') };
        }
    }

    async fetchOrderIdByUserId(userId: string): Promise<ApiResponse<string>> {
        const response = await this._fetchResponse<{ id: string }[]>(`${API_URL}/orders?clientId=${userId}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: 'components.waitingOrder.orderDoesNotExist' };
        }
        return { data: response.data[0].id, error: null };
    }

    async fetchOrderedMealByOrderId(id: string): Promise<ApiResponse<OrderState>> {
        const response = await this._fetchResponse<OrderState[]>(`${API_URL}/orders?id=${id}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: 'components.waitingOrder.errorReceivingOrderData' };
        }
        return { data: response.data[0], error: null };
    }

    async cancelOrder(id: string): Promise<ApiResponse<void>> {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cancellationStatus: 'requested', isCancellationRequested: true }),
        };
        const response = await this._fetchResponse<void>(`${API_URL}/orders/${id}`, options);
        if (response.error) {
            return { data: null, error: 'components.waitingOrder.errorWhileCancellingTheOrder' };
        }
        return { data: null, error: null };
    }

    async checkPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
        const response = await this._fetchResponse<OrderState[]>(`${API_URL}/orders?clientId=${userId}`);
        if (response.error || !response.data || response.data.length === 0) {
            return { data: null, error: 'components.waitingOrder.orderDoesNotExist' };
        }
        return { data: response.data[0].preparationStatus, error: null };
    }
}

export default OrderServiceReal;
