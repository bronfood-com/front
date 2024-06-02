import { useState, useEffect } from 'react';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderState } from '../../api/orderService/orderService';
import OrderServiceReal from '../../api/orderService/orderSeviceReal';
import i18n from 'i18next';

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

    const {
        mutate: cancelOrderMutate,
        isPending: isCancelOrderPending,
        isSuccess: isCancelOrderSuccess,
    } = useMutation({
        mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order', userId] });
        },
        onError: (error) => {
            const errorMsg = typeof error === 'string' ? error : i18n.t('errors.anUnexpectedErrorHasOccurred');
            setErrorMessage(errorMsg);
        },
    });

    const queryOptions: UseQueryOptions<'confirmed' | 'waiting' | 'notConfirmed' | null> = {
        queryKey: ['checkPreparationStatus', placedOrder?.id],

        // uncomment below queryFn for realservice

        // queryFn: async () => {
        //     const response = await orderService.checkPreparationStatus(placedOrder?.id ?? '');
        //     return response.data;
        // },

        // below queryFn is used for testing
        queryFn: async () => {
            // Симуляция возврата статуса 'confirmed' через 5 секунд
            await new Promise((res) => setTimeout(res, 5000));
            return 'confirmed' as 'confirmed' | 'waiting' | 'notConfirmed';
        },
        enabled: !!userId && !!placedOrder,
        refetchInterval: 10000,
    };

    const { data: preparationStatus, error: statusError, isFetching: isQueryFetching } = useQuery(queryOptions);

    useEffect(() => {
        if (statusError) {
            const errorMsg = typeof statusError === 'string' ? statusError : i18n.t('errors.anUnexpectedErrorHasOccurred');
            setErrorMessage(errorMsg);
        }
    }, [statusError]);

    const isLoading = isQueryFetching || isCancelOrderPending;

    return {
        preparationTime,
        setPreparationTime,
        cancellationTime,
        setCancellationTime,
        cancelOrder: {
            mutate: cancelOrderMutate,
            isPending: isCancelOrderPending,
            isSuccess: isCancelOrderSuccess,
        },
        errorMessage: errorMessage || statusError,
        isLoading,
        preparationStatus,
        placedOrder,
    };
};
