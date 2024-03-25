import { Dispatch, SetStateAction } from 'react';
import styles from './Counter.module.scss';

function Counter({ count, setCount }: { count: number, setCount: Dispatch<SetStateAction<number>> }) {
    const increment = () => setCount(count + 1);
    const decrement = () => count < 1 ? setCount(count) : setCount(count - 1);
    return (
        <div className={`${styles.counter}`}>
            <div onClick={decrement} className={`${styles.counter__icon} ${styles.counter__icon_minus}`} />
            <span className={styles.counter__count}>{count}</span>
            <div onClick={increment} className={`${styles.counter__icon} ${styles.counter__icon_plus}`} />
        </div>
    );
}

export default Counter;
