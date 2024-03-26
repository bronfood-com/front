import styles from './OrderTimeCounter.module.scss';
const OrderTimeCounter = () => {
  return (
    <div className={styles.orderTimeCounter}>
        <div className={styles.orderTimeCounter__container}>
            <p className={styles.orderTimeCounter__time}><span className={styles.orderTimeCounter__time_number}>15мин.</span></p>
        </div>
    </div>
  )
}

export default OrderTimeCounter;
