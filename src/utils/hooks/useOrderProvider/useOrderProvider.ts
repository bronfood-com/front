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
    const [cancellationTime, setCancellationTime] = useState<number>(0);
    const [waitOrderIdTime, setWaitOrderIdTime] = useState<number>(120);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [preparationStatus, setPreparationStatus] = useState<string>('waiting');

    const orderService = useMemo(() => new OrderServiceMock(), []);

    const handleCancelOrder = useCallback(
        async (id: string) => {
            setIsLoading(true);
            const result = await orderService.cancelOrder(id);
            if (result.error) {
                setErrorMessage(result.error);
            } else {
                setPreparationTime(0);
                setInitialPreparationTime(0);
                setCancellationTime(0);
                setWaitOrderIdTime(120);
                setPreparationStatus('waiting');
            }
            setIsLoading(false);
        },
        [orderService]
    );

    const state = useMemo(
        () => ({
            orderedMeal,
            setOrderedMeal,
            preparationTime,
            setPreparationTime,
            preparationStatus,
            setPreparationStatus,
            initialPreparationTime,
            setInitialPreparationTime,
            cancellationTime,
            setCancellationTime,
            waitOrderIdTime,
            setWaitOrderIdTime,
            isLoading,
            setIsLoading,
            errorMessage,
            setErrorMessage,
            cancelOrder: handleCancelOrder,
        }),
        [orderedMeal, preparationTime, preparationStatus, initialPreparationTime, cancellationTime, waitOrderIdTime, isLoading, errorMessage, handleCancelOrder]
    );

    useTimers({ setPreparationTime: state.setPreparationTime, setWaitOrderIdTime: state.setWaitOrderIdTime, setCancellationTime: state.setCancellationTime });

    useEffect(() => {
        const fetchOrderData = async () => {
            setIsLoading(true);
            const orderIdResponse = await orderService.fetchOrderIdByUserId(userId);
            if (orderIdResponse.data) {
                const details = await orderService.fetchOrderedMealByOrderId(orderIdResponse.data);
                if (details.data) {
                    setOrderedMeal(details.data);
                    setInitialPreparationTime(details.data.preparationTime);
                    setPreparationTime(details.data.preparationTime);
                    setCancellationTime(details.data.cancellationTime);
                    setWaitOrderIdTime(0);
                } else {
                    setErrorMessage(details.error || t('components.waitingOrder.errorReceivingOrderData'));
                }
            } else {
                setErrorMessage(orderIdResponse.error || t('components.waitingOrder.orderDoesNotExist'));
            }
            setIsLoading(false);
        };

        fetchOrderData();
    }, [userId, t, orderService, setOrderedMeal, setInitialPreparationTime, setPreparationTime, setCancellationTime, setWaitOrderIdTime, setIsLoading, setErrorMessage]);

    /**
     * this useEffect is just for testing preparationStatus, to be removed after testing
     */
    useEffect(() => {
        if (preparationStatus === 'waiting') {
            const timer = setTimeout(async () => {
                const confirmResult = await orderService.checkAndConfirmPreparationStatus(userId);
                if (confirmResult.data === 'confirmed') {
                    setPreparationStatus('confirmed');
                    setTimeout(async () => {
                        const notConfirmResult = await orderService.checkAndNotConfirmPreparationStatus(userId);
                        if (notConfirmResult.data === 'notConfirmed') {
                            setPreparationStatus('notConfirmed');
                        }
                    }, 60000);
                }
            }, 120000);

            return () => clearTimeout(timer);
        }
    }, [orderService, preparationStatus, userId]);

    return state;
};
