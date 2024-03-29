import { useContext } from 'react';
import { BasketContext } from '../../../contexts/BasketContext';

export const useBasket = () => useContext(BasketContext);
