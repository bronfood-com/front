/**
 * Custom hook to manage multiple timers for different application states such as preparation time,
 * wait order ID time, and cancellation countdown. This hook abstracts the complexity of managing
 * intervals and ensures that timers are cleaned up when not needed.
 *
 * @param {Object} props The properties required to manage the timers.
 * @param {TimerCallback} [props.setPreparationTime] Function to update the preparation time.
 *                                                   This function should take the previous time
 *                                                   and return the new time.
 * @param {TimerCallback} [props.setWaitOrderIdTime] Function to decrement the wait order ID time.
 *                                                   Executes every second until time reaches zero
 *                                                   or it's manually stopped.
 * @param {TimerCallback} [props.setCancellationCountdown] Function to decrement the cancellation
 *                                                         countdown. Similar to setWaitOrderIdTime,
 *                                                         but for managing cancellation timing.
 * @param {Function} [props.stopWaitOrderIdTimer] Optional function to be called when the wait
 *                                                order ID timer reaches zero or needs to be stopped.
 */
import { useEffect, useRef } from 'react';

type TimerCallback = (prevTime: number) => number;

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
    * Optional function to be called when the wait
    * order ID timer reaches zero or needs to be stopped.
    */
    stopWaitOrderIdTimer?: () => void;
    /**
    * Function to decrement the cancellation
    * countdown. Similar to setWaitOrderIdTime,
    * but for managing cancellation timing.
    */
    setCancellationCountdown?: (updateFn: TimerCallback) => void;
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
            setWaitOrderIdTime(prevTime => {
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
