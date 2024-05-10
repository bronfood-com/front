import { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderState } from '../../api/orderService/orderService';
import OrderServiceMock from '../../api/orderService/orderServiceMock';
import { useTranslation } from 'react-i18next';
import { useTimers } from '../useTimer/useTimer';
import { OrderContextType } from '../../../contexts/OrderContext';

export const useOrderProvider = (userId: string): OrderContextType => {
    const { t } = useTranslation();

    const [orderedMeal, setOrderedMeal] = useState<OrderState | null>(null);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [initialPreparationTime, setInitialPreparationTime] = useState<number>(0);
    const [cancellationCountdown, setCancellationCountdown] = useState<number>(0);
    const [waitOrderIdTime, setWaitOrderIdTime] = useState<number>(120);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const orderService = useMemo(() => new OrderServiceMock(), []);

    const handleCancelOrder = useCallback(async (id: string) => {
        setIsLoading(true);
        const result = await orderService.cancelOrder(id);
        if (result.error) {
            setErrorMessage(result.error);
        } else {
            setPreparationTime(0);
            setInitialPreparationTime(0);
            setCancellationCountdown(0);
            setWaitOrderIdTime(120);
        }
        setIsLoading(false);
    }, [orderService]);

    const state = useMemo(() => ({
        orderedMeal,
        setOrderedMeal,
        preparationTime,
        setPreparationTime,
        initialPreparationTime,
        setInitialPreparationTime,
        cancellationCountdown,
        setCancellationCountdown,
        waitOrderIdTime,
        setWaitOrderIdTime,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        cancelOrder: handleCancelOrder,
    }), [
        orderedMeal,
        preparationTime,
        initialPreparationTime,
        cancellationCountdown,
        waitOrderIdTime,
        isLoading,
        errorMessage,
        handleCancelOrder
    ]);

    useTimers({ setPreparationTime: state.setPreparationTime, setWaitOrderIdTime: state.setWaitOrderIdTime, setCancellationCountdown: state.setCancellationCountdown });

    useEffect(() => {
        const interval = setInterval(async () => {
            const orderIdResponse = await orderService.fetchOrderIdByUserId(userId);
            if (orderIdResponse.data) {
                clearInterval(interval);
                const details = await orderService.fetchOrderedMealByOrderId(orderIdResponse.data);
                if (details.data) {
                    setOrderedMeal(details.data);
                    setInitialPreparationTime(details.data.preparationTime);
                    setPreparationTime(details.data.preparationTime);
                    setCancellationCountdown(details.data.cancellationTime);
                    setWaitOrderIdTime(0);
                } else {
                    setErrorMessage(details.error || t('components.waitingOrder.errorReceivingOrderData'));
                }
                setIsLoading(false);
            } else {
                setErrorMessage(orderIdResponse.error || t('components.waitingOrder.orderDoesNotExist'));
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [userId, t, orderService, setOrderedMeal, setInitialPreparationTime, setPreparationTime, setCancellationCountdown, setWaitOrderIdTime, setIsLoading, setErrorMessage]);

    return state;
};
