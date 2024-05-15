import { useEffect, useRef } from 'react';

type TimerCallback = (prevTime: number) => number;

/**
 * Hook to manage multiple timers for different application states.
 */
interface UseTimerProps {
    /**
     * This timer updates the state by counting down
     * the remaining time until the order is ready.
     * The setPreparationTime function is called every
     * minute (60000 milliseconds) and takes an update
     * function that decreases the remaining time.
     */
    setPreparationTime?: (updateFn: TimerCallback) => void;
    /**
     * This timer updates the state every second by
     * counting down the remaining time until the order
     * code is received. The setWaitOrderIdTime function
     * is called every second (1000 milliseconds) and takes
     * an update function that decreases the remaining time.
     * When the time reaches zero, the timer stops and the
     * optional stopWaitOrderIdTimer function is called.
     */
    setWaitOrderIdTime?: (updateFn: TimerCallback) => void;
    /**
     * This timer updates the state every second by counting
     * down the remaining time until the order can no longer
     * be cancelled. The setCancellationTime function is
     * called every second (1000 milliseconds) and takes an
     * update function that decreases the remaining time.
     */
    setCancellationTime?: (updateFn: TimerCallback) => void;
    /**
     * The stopWaitOrderIdTimer function is used to manually
     * stop the timer for waiting to receive the order code
     * from useOrderProvider. This function is called when
     * the waiting time reaches zero or the timer needs to be
     * stopped for other reasons.
     */
    stopWaitOrderIdTimer?: () => void;
}

export const useTimers = ({ setPreparationTime, setWaitOrderIdTime, setCancellationTime, stopWaitOrderIdTimer }: UseTimerProps) => {
    const startTimeRef = useRef<{ prep: null | number; waitOrderId: null | number; cancel: null | number }>({
        prep: null,
        waitOrderId: null,
        cancel: null,
    });

    useEffect(() => {
        if (!setWaitOrderIdTime) return;

        // Timer for counting down and updating the UI progress bar for waiting to receive the orderId
        const interval = setInterval(() => {
            setWaitOrderIdTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    if (stopWaitOrderIdTimer) {
                        stopWaitOrderIdTimer();
                    }
                    return prevTime;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [setWaitOrderIdTime, stopWaitOrderIdTimer]);

    useEffect(() => {
        if (!setPreparationTime) return;

        // Timer for counting down the order readiness status called preparationTime
        startTimeRef.current.prep = Date.now();
        const interval = 60000;

        // Starts an interval to update the preparationTime every minute based on elapsed time
        const orderTimer = window.setInterval(() => {
            // We add a check for null to ensure that the timer hasn't been cleared
            // If the timer is cleared elsewhere in the code, this check prevents errors
            if (startTimeRef.current.prep != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.prep) / interval);
                setPreparationTime((prevTime) => prevTime - elapsed);
                startTimeRef.current.prep = now;
            }
        }, interval);

        return () => clearInterval(orderTimer);
    }, [setPreparationTime]);

    useEffect(() => {
        if (!setCancellationTime) return;

        // Timer for counting down and updating the UI counter after which the order cannot be cancelled
        startTimeRef.current.cancel = Date.now();
        const interval = 1000;

        // Starts an interval to update the cancellation Time every second based on elapsed time
        const cancellationTimer = window.setInterval(() => {
            // We add a check for null to ensure that the timer hasn't been cleared
            // If the timer is cleared elsewhere in the code, this check prevents errors
            if (startTimeRef.current.cancel != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.cancel) / interval);
                setCancellationTime((prevTime) => prevTime - elapsed);
                startTimeRef.current.cancel = now;
            }
        }, interval);

        return () => clearInterval(cancellationTimer);
    }, [setCancellationTime]);
};
