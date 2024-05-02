import { useEffect, useState } from 'react';
import { OrderContextType } from '../../../contexts/OrderContext';
import { cancelOrder, fetchOrderedMealByOrderId, fetchOrderIdByClientId } from '../../api/orderService/orderServiceMockReqs';
import { useTimers } from '../useTimer/useTimer';
import { OrderState } from '../../api/orderService/orderService';
import { useTranslation } from 'react-i18next';

export const useOrderProvider = (clientId: string): OrderContextType => {
    const { t } = useTranslation();

    const WAIT_CODE_IN_SECONDS = 5 * 60;
    const [orderedMeal, setOrderedMeal] = useState<OrderState | null>(null);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [initialPreparationTime, setInitialPreparationTime] = useState<number>(0);
    const [cancellationCountdown, setCancellationCountdown] = useState<number>(0);
    const [waitOrderCodeTime, setWaitOrderCodeTime] = useState<number>(WAIT_CODE_IN_SECONDS);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useTimers({ setPreparationTime, setWaitOrderCodeTime, setCancellationCountdown });

    useEffect(() => {
        const fetchOrder = async () => {
            setIsLoading(true);
            const orderIdResponse = await fetchOrderIdByClientId(clientId);
            if (orderIdResponse.error || orderIdResponse.data === null) {
                setErrorMessage(orderIdResponse.error || t('components.waitingOrder.orderDoesNotExist'));
                setIsLoading(false);
                return;
            }

            const orderedMealResponse = await fetchOrderedMealByOrderId(orderIdResponse.data);
            if (orderedMealResponse.error || orderedMealResponse.data === null) {
                setErrorMessage(orderedMealResponse.error || t('components.waitingOrder.errorReceivingOrderData'));
                setIsLoading(false);
                return;
            }

            const details = orderedMealResponse.data;
            setOrderedMeal({
                ...details,
                confirmationStatus: details.confirmationStatus
            });
            setPreparationTime(details.preparationTime);
            setInitialPreparationTime(details.preparationTime);
            setCancellationCountdown(details.cancellationTime);
            setIsLoading(false);
        };
        fetchOrder();
    }, [clientId, t]);

    const handleCancelOrder = async (orderId: string) => {
        setIsLoading(true);
        const result = await cancelOrder(orderId);
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
        setWaitOrderCodeTime(WAIT_CODE_IN_SECONDS);
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
        waitOrderCodeTime,
        setWaitOrderCodeTime,
        showConfirmationPopup,
        setShowConfirmationPopup,
        isLoading,
        setIsLoading,
        cancelOrder: handleCancelOrder,
        errorMessage,
        setErrorMessage,
    };
};
