import { useEffect, useRef } from 'react';

type TimerCallback = (prevTime: number) => number;

/**
 * Custom hook to manage and update various timers.
 * The hook initializes and manages timers based on provided callback functions for updating state.
 * It leverages `setInterval` to periodically update each of the three different time values.
 *
 * @param {UseTimerProps} props - The properties that define the necessary update functions for the timers.
 * @returns {void}
 */

interface UseTimerProps {
    /** Function to update the preparation time. Receives a callback that expects the previous time and returns the new time. */
    setPreparationTime?: (updateFn: TimerCallback) => void;
    /** Function to update the wait time for order code. Receives a callback similar to setPreparationTime. */
    setWaitOrderCodeTime?: (updateFn: TimerCallback) => void;
    /** Function to update the cancellation countdown. Receives a callback similar to setPreparationTime. */
    setCancellationCountdown?: (updateFn: TimerCallback) => void;
}

export const useTimers = ({ setPreparationTime, setWaitOrderCodeTime, setCancellationCountdown }: UseTimerProps) => {
    const startTimeRef = useRef<{ prep: null | number, wait: null | number, cancel: null | number }>({
        prep: null,
        wait: null,
        cancel: null
    });

    useEffect(() => {
        if (!setPreparationTime) return;
        startTimeRef.current.prep = Date.now();
        const interval = 60000;
        const orderTimer = window.setInterval(() => {
            if (startTimeRef.current.prep != null) { // Добавляем проверку на null
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.prep) / interval);
                setPreparationTime((prevTime) => prevTime - elapsed);
                startTimeRef.current.prep = now; // Обновляем время начала после каждого тика
            }
        }, interval);
        return () => clearInterval(orderTimer);
    }, [setPreparationTime]);

    useEffect(() => {
        if (!setWaitOrderCodeTime) return;
        startTimeRef.current.wait = Date.now();
        const interval = 1000;
        const waitOrderCodeTimer = window.setInterval(() => {
            if (startTimeRef.current.wait != null) { // Добавляем проверку на null
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.wait) / interval);
                setWaitOrderCodeTime((prevTime) => prevTime - elapsed);
                startTimeRef.current.wait = now;
            }
        }, interval);
        return () => clearInterval(waitOrderCodeTimer);
    }, [setWaitOrderCodeTime]);

    useEffect(() => {
        if (!setCancellationCountdown) return;
        startTimeRef.current.cancel = Date.now();
        const interval = 1000;
        const cancellationTimer = window.setInterval(() => {
            if (startTimeRef.current.cancel != null) { // Добавляем проверку на null
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.cancel) / interval);
                setCancellationCountdown((prevTime) => prevTime - elapsed);
                startTimeRef.current.cancel = now;
            }
        }, interval);
        return () => clearInterval(cancellationTimer);
    }, [setCancellationCountdown]);
};
