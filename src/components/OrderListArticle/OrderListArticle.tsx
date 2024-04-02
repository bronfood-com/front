import { FC } from "react";
import { IOrder } from "../../interfaces/order";
import styles from "./OrderListArticle.module.scss";
import { OrderListItem } from "../OrderListItem/OrderListItem";

type OrderListArticleProps = {
    order: IOrder;
}
const OrderListArticle: FC<OrderListArticleProps> = ({ order }) => {
    return (
        <article className={styles.orderListArticle}>
            <header className={styles.orderListArticle__header}>
                <h2 className={styles.orderListArticle__total}>{order.total} &#x20B8;</h2>
            </header>
            <ul className={styles.orderListArticle__list}>
                {order.items.map((item) => (
                    <OrderListItem item={item} key={item.id} />
                ))}
            </ul>
        </article>
    )
}

export default OrderListArticle;
