import { useEffect, useRef } from 'react';

type TimerCallback = (prevTime: number) => number;

/**
 * Hook to manage multiple timers for different application states.
 *
 * @param {UseTimerProps} props The properties required to manage the timers.
 */
interface UseTimerProps {
    /**
    * Function to update the preparation time.
    * This function should take the previous time
    * and return the new time.
    */
    setPreparationTime?: (updateFn: TimerCallback) => void;
    /**
    * Function to decrement the wait order ID time.
    * Executes every second until time reaches zero
    * or it's manually stopped.
    */
    setWaitOrderIdTime?: (updateFn: TimerCallback) => void;
    /**
    * Function to decrement the cancellation
    * countdown. Similar to setWaitOrderIdTime,
    * but for managing cancellation timing.
    */
    setCancellationCountdown?: (updateFn: TimerCallback) => void;
    /**
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

        // Starts an interval to decrement the wait order ID time every second
        const interval = setInterval(() => {
            setWaitOrderIdTime(prevTime => {
                if (prevTime <= 0) {
                    // Stops the timer when the time reaches zero and calls the optional stop function
                    clearInterval(interval);
                    if (stopWaitOrderIdTimer) {
                        stopWaitOrderIdTimer();
                    }
                    return prevTime;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleans up the interval when the component is unmounted or the dependencies change
        return () => clearInterval(interval);
    }, [setWaitOrderIdTime, stopWaitOrderIdTimer]);

    useEffect(() => {
        if (!setPreparationTime) return;

        // Records the start time for the preparation timer
        startTimeRef.current.prep = Date.now();
        const interval = 60000;

        // Starts an interval to update the preparation time every minute based on elapsed time
        const orderTimer = window.setInterval(() => {
            if (startTimeRef.current.prep != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.prep) / interval);
                setPreparationTime((prevTime) => prevTime - elapsed);
                startTimeRef.current.prep = now;
            }
        }, interval);

        // Cleans up the interval when the component is unmounted or the dependencies change
        return () => clearInterval(orderTimer);
    }, [setPreparationTime]);

    useEffect(() => {
        if (!setCancellationCountdown) return;

        // Records the start time for the cancellation countdown timer
        startTimeRef.current.cancel = Date.now();
        const interval = 1000;

        // Starts an interval to update the cancellation countdown every second based on elapsed time
        const cancellationTimer = window.setInterval(() => {
            if (startTimeRef.current.cancel != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.cancel) / interval);
                setCancellationCountdown((prevTime) => prevTime - elapsed);
                startTimeRef.current.cancel = now;
            }
        }, interval);

        // Cleans up the interval when the component is unmounted or the dependencies change
        return () => clearInterval(cancellationTimer);
    }, [setCancellationCountdown]);
};
