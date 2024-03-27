import { FC } from "react";
import { IOrder } from "../../interfaces/order";
import styles from "./OrderListArticle.module.scss";

type OrderListArticleProps = {
    order: IOrder;
}
const OrderListArticle: FC<OrderListArticleProps> = ({ order }) => {
  return (
    <article className={styles.orderListArticle}>
      <header className={styles.orderListArticle__header}>
        <h2 className={styles.orderListArticle__total}>{order.total} ₸</h2>
      </header>
      <ul className={styles.orderListArticle__list}>
        {order.items.map((item) => (
          <li className={styles.orderListArticle__item} key={item.id}>
            <figure className={styles.orderListArticle__figure}>
              <img
                className={styles.orderListArticle__image}
                src={item.imageUrl}
                alt={item.name}
              />
              <figcaption className={styles.orderListArticle__caption}>
                {item.name}
              </figcaption>
              {/* <p className={styles.orderListArticle__price}>{item.price} тенге</p> */}
            </figure>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default OrderListArticle;
