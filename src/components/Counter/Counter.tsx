import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Counter.module.scss';

function Counter({ count, setCount }: { count: number; setCount: Dispatch<SetStateAction<number>> }) {
    const [isMinusActive, setIsMinusActive] = useState(false);
    const [isPlusActive, setIsPlusActive] = useState(false);
    const increment = () => setCount(count + 1);
    const decrement = () => (count < 1 ? setCount(count) : setCount(count - 1));
    return (
        <div className={`${styles.counter}`}>
            <div
                onClick={decrement}
                onMouseDown={() => setIsMinusActive(true)}
                onMouseUp={() => setIsMinusActive(false)}
                className={`${styles.counter__icon} ${isMinusActive ? styles.counter__icon_minus_active : styles.counter__icon_minus}`}
            />
            <span className={styles.counter__count}>{count}</span>
            <div
                onClick={increment}
                onMouseDown={() => setIsPlusActive(true)}
                onMouseUp={() => setIsPlusActive(false)}
                className={`${styles.counter__icon} ${isPlusActive ? styles.counter__icon_plus_active : styles.counter__icon_plus}`}
            />
        </div>
    );
}

export default Counter;
