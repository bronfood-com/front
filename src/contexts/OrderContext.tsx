import { createContext, ReactNode, FC } from 'react';
import { useOrderProvider } from '../utils/hooks/useOrderProvider/useOrderProvider';
import { OrderState } from '../utils/api/orderService/orderService';

export interface OrderContextType {
    orderedMeal: OrderState | null;
    setOrderedMeal: React.Dispatch<React.SetStateAction<OrderState | null>>;
    preparationTime: number;
    setPreparationTime: React.Dispatch<React.SetStateAction<number>>;
    initialPreparationTime: number;
    setInitialPreparationTime: React.Dispatch<React.SetStateAction<number>>;
    cancellationCountdown: number;
    setCancellationCountdown: React.Dispatch<React.SetStateAction<number>>;
    waitOrderCodeTime: number;
    setWaitOrderCodeTime: React.Dispatch<React.SetStateAction<number>>;
    showConfirmationPopup: boolean;
    setShowConfirmationPopup: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    cancelOrder: (id: string) => Promise<void>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const defaultOrderContextValue: OrderContextType = {
    orderedMeal: null,
    setOrderedMeal: () => {},
    preparationTime: 0,
    setPreparationTime: () => {},
    initialPreparationTime: 0,
    setInitialPreparationTime: () => {},
    cancellationCountdown: 0,
    setCancellationCountdown: () => {},
    waitOrderCodeTime: 0,
    setWaitOrderCodeTime: () => {},
    showConfirmationPopup: false,
    setShowConfirmationPopup: () => {},
    isLoading: true,
    setIsLoading: () => {},
    cancelOrder: async () => {},
    errorMessage: '',
    setErrorMessage: () => {},
};

interface OrderProviderProps {
    children: ReactNode;
    userId: string;
}

export const OrderContext = createContext<OrderContextType>(defaultOrderContextValue);

export const OrderProvider: FC<OrderProviderProps> = ({ children, userId }) => {
    const value = useOrderProvider(userId);
    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
