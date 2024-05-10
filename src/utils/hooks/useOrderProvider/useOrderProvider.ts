import { useEffect, useMemo, useState } from 'react';
import { OrderContextType } from '../../../contexts/OrderContext';
import OrderServiceMock from '../../api/orderService/orderServiceMock';
import { useTimers } from '../useTimer/useTimer';
import { OrderState } from '../../api/orderService/orderService';
import { useTranslation } from 'react-i18next';

export const useOrderProvider = (userId: string): OrderContextType => {
    const { t } = useTranslation();

    const [orderedMeal, setOrderedMeal] = useState<OrderState | null>(null);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [initialPreparationTime, setInitialPreparationTime] = useState<number>(0);
    const [cancellationCountdown, setCancellationCountdown] = useState<number>(0);
    const [waitOrderIdTime, setWaitOrderIdTime] = useState<number>(120);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useTimers({ setPreparationTime, setWaitOrderIdTime, setCancellationCountdown });

    const orderService = useMemo(() => new OrderServiceMock(), []);

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
    }, [userId, setWaitOrderIdTime, t, orderService]);

    const handleCancelOrder = async (orderId: string) => {
        setIsLoading(true);
        const result = await orderService.cancelOrder(orderId);
        if (result.error) {
            setErrorMessage(result.error);
        } else {
            resetStates();
        }
        setIsLoading(false);
    };

    const resetStates = () => {
        setPreparationTime(0);
        setInitialPreparationTime(0);
        setCancellationCountdown(0);
        setWaitOrderIdTime(0);
    };

    return {
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
        showConfirmationPopup,
        setShowConfirmationPopup,
        isLoading,
        setIsLoading,
        cancelOrder: handleCancelOrder,
        errorMessage,
        setErrorMessage,
    };
};
