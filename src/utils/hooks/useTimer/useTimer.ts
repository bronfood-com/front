import { useEffect, useRef } from 'react';

type TimerCallback = (prevTime: number) => number;

/**
 * Hook to manage multiple timers for different application states.
 */
interface UseTimerProps {
    /**
     * timer is used for the countdown of the order readiness status.
     * This function should take the previous time
     * and return the new time.
     */
    setPreparationTime?: (updateFn: TimerCallback) => void;
    /**
     * timer is used for counting down and updating
     * the UI progress bar for waiting to receive the orderId.
     * Executes every second until time reaches zero
     * or it's manually stopped.
     */
    setWaitOrderIdTime?: (updateFn: TimerCallback) => void;
    /**
     * timer is used for counting down and updating
     * the UI counter after which the order cannot
     * be cancelled. Similar to setWaitOrderIdTime,
     * but for managing cancellation timing.
     */
    setCancellationCountdown?: (updateFn: TimerCallback) => void;
    /**
     * function is used for manually stopping the timer from useOrderProvider.
     * Optional function to be called when the wait
     * order ID timer reaches zero or needs to be stopped.
     */
    stopWaitOrderIdTimer?: () => void;
}

export const useTimers = ({ setPreparationTime, setWaitOrderIdTime, setCancellationCountdown, stopWaitOrderIdTimer }: UseTimerProps) => {
    const startTimeRef = useRef<{ prep: null | number; wait: null | number; cancel: null | number }>({
        prep: null,
        wait: null,
        cancel: null,
    });

    useEffect(() => {
        if (!setWaitOrderIdTime) return;

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

        startTimeRef.current.prep = Date.now();
        const interval = 60000;

        const orderTimer = window.setInterval(() => {
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
        if (!setCancellationCountdown) return;

        startTimeRef.current.cancel = Date.now();
        const interval = 1000;

        const cancellationTimer = window.setInterval(() => {
            if (startTimeRef.current.cancel != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.cancel) / interval);
                setCancellationCountdown((prevTime) => prevTime - elapsed);
                startTimeRef.current.cancel = now;
            }
        }, interval);

        return () => clearInterval(cancellationTimer);
    }, [setCancellationCountdown]);
};
