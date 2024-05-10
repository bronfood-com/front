import { createContext, ReactNode, FC } from 'react';
import { useOrderProvider } from '../utils/hooks/useOrderProvider/useOrderProvider';
import { OrderState } from '../utils/api/orderService/orderService';

export interface OrderContextType {
    orderedMeal: OrderState | null;
    preparationTime: number;
    initialPreparationTime: number;
    cancellationCountdown: number;
    waitOrderIdTime: number;
    isLoading: boolean;
    cancelOrder: (id: string) => Promise<void>;
    errorMessage: string;
}

const defaultOrderContextValue: OrderContextType = {
    orderedMeal: null,
    preparationTime: 0,
    initialPreparationTime: 0,
    cancellationCountdown: 0,
    waitOrderIdTime: 0,
    isLoading: true,
    cancelOrder: async () => {},
    errorMessage: '',
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
