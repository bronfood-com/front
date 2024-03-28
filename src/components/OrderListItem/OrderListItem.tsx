import { FC } from "react";
import { IOrder } from "../../interfaces/order";
import styles from "./OrderListItem.module.scss";

export const OrderListItem: FC<{ item: IOrder["items"][number] }> = ({ item }) => (
    <li className={styles.orderListItem__item}>
        <figure className={styles.orderListItem__figure}>
            <img
                className={styles.orderListItem__image}
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
            />
            <figcaption className={styles.orderListItem__caption}>
                {item.name}
            </figcaption>
        </figure>
    </li>
);
