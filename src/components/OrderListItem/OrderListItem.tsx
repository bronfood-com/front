import { FC } from 'react';
import styles from './OrderListItem.module.scss';
import { OrderState } from '../../interfaces/OrderInterface';

export const OrderListItem: FC<{ item: OrderState['orderDetails'][number] }> = ({ item }) => (
    <li className={styles.orderListItem__item}>
        <h3 className={styles.orderListItem__title}>{item.itemDescription}</h3>
        <p className={styles.orderListItem__price}>
            {item.itemPrice} &#x20B8;&nbsp;
            <span className={styles.orderListItem__span}>x{item.quantity}</span>
        </p>
    </li>
);
