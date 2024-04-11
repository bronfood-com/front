import { OrderState } from '../orderService/orderService';

const baseUrl = 'http://localhost:3001';

async function fetchResponse<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export const fetchOrderIdByClientId = async (clientId: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch(`${baseUrl}/orders?clientId=${clientId}`);
                const orders = await response.json();
                if (orders.length > 0) {
                    resolve(orders[0].id);
                } else {
                    resolve(null);
                }
            } catch (error) {
                reject(error);
            }
        }, 3000); // Задержка в 3 сек для наладки
    });
};

export const fetchOrderDetailsByOrderId = async (id: string): Promise<OrderState | undefined> => {
    try {
        const orders: OrderState[] = await fetchResponse<OrderState[]>(`${baseUrl}/orders?id=${id}`);
        return orders.length > 0 ? orders[0] : undefined;
    } catch (error) {
        throw new Error('Ошибка при получении данных заказа');
    }
};

export const cancelOrder = async (id: string): Promise<void> => {
    try {
        const body = JSON.stringify({
            cancellationStatus: 'requested',
            isCancellationRequested: true,
        });

        await fetch(`${baseUrl}/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
    } catch (error) {
        throw new Error('Ошибка при отмене заказа:');
    }
};
