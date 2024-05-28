import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderState } from '../../api/orderService/orderService';
import OrderServiceReal from '../../api/orderService/orderSeviceReal';

export const useOrderData = (userId: string, placedOrder: OrderState | null) => {
    const queryClient = useQueryClient();
    const orderService = new OrderServiceReal();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [preparationTime, setPreparationTime] = useState<number | null>(null);
    const [cancellationTime, setCancellationTime] = useState<number | null>(null);

    useEffect(() => {
        if (placedOrder) {
            setPreparationTime(placedOrder.preparationTime);
            setCancellationTime(placedOrder.cancellationTime);
        }
    }, [placedOrder]);

    const cancelOrder = useMutation({
        mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order', userId] });
        },
        onError: (error) => {
            setErrorMessage(String(error));
        },
    });

    return {
        preparationTime,
        setPreparationTime,
        cancellationTime,
        setCancellationTime,
        cancelOrder,
        errorMessage,
    };
};
