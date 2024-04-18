import { useEffect, useState } from 'react';
import { OrderContextType } from '../../../contexts/OrderContext';
import { cancelOrder, fetchOrderDetailsByOrderId, fetchOrderIdByClientId } from '../../api/orderService/orderServiceMockReqs'
// import { cancelOrder, fetchOrderDetailsByOrderId, fetchOrderIdByClientId } from '../../api/orderApiRequests/orderApi';
import { useTimers } from '../useTimer/useTimer';
import { OrderState } from '../../api/orderService/orderService';
import { useTranslation } from 'react-i18next';

export const useOrderProvider = (clientId: string): OrderContextType => {
    const { t } = useTranslation();

    const WAIT_CODE_IN_SECONDS = 5 * 60;
    const [orderDetails, setOrderDetails] = useState<OrderState | null>(null);
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
            try {
                const orderIdResponse = await fetchOrderIdByClientId(clientId);
                if (orderIdResponse.error || orderIdResponse.data === null) {
                    setErrorMessage(orderIdResponse.error || t('components.waitingOrder.orderDoesNotExist'));
                    setIsLoading(false);
                    return;
                }

                const orderDetailsResponse = await fetchOrderDetailsByOrderId(orderIdResponse.data);
                if (orderDetailsResponse.error || orderDetailsResponse.data === null) {
                    setErrorMessage(orderDetailsResponse.error || t('components.waitingOrder.errorReceivingOrderData'));
                    setIsLoading(false);
                    return;
                }

                const details = orderDetailsResponse.data;
                setOrderDetails(details);
                setPreparationTime(details.preparationTime);
                setInitialPreparationTime(details.preparationTime);
                setCancellationCountdown(details.cancellationTime);
            } catch (error) {
                setErrorMessage(t('components.waitingOrder.errorReceivingOrderData'));
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrder();
    }, [clientId, t]);

    const handleCancelOrder = async () => {
        setIsLoading(true);
        try {
            if (orderDetails?.id) {
                await cancelOrder(orderDetails.id);
                resetStates();
            } else {
                setErrorMessage(t('components.waitingOrder.orderDoesNotExist') as string);
            }
        } catch (error) {
            setErrorMessage(t('components.waitingOrder.errorWhileCancellingTheOrder') as string);
        } finally {
            setIsLoading(false);
        }
    };

    const resetStates = () => {
        setPreparationTime(0);
        setInitialPreparationTime(0);
        setCancellationCountdown(0);
        setWaitOrderCodeTime(WAIT_CODE_IN_SECONDS);
    };

    return {
        orderDetails,
        setOrderDetails,
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
