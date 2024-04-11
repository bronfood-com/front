import { useEffect } from 'react';

type TimerCallback = (prevTime: number) => number;

interface UseTimerProps {
    setPreparationTime?: (updateFn: TimerCallback) => void;
    setWaitOrderCodeTime?: (updateFn: TimerCallback) => void;
    setCancellationCountdown?: (updateFn: TimerCallback) => void;
}

export const useTimers = ({ setPreparationTime, setWaitOrderCodeTime, setCancellationCountdown }: UseTimerProps) => {
    useEffect(() => {
        if (!setPreparationTime) return;
        const orderTimer = window.setInterval(() => {
            setPreparationTime((prevTime) => prevTime - 1);
        }, 60000);
        return () => clearInterval(orderTimer);
    }, [setPreparationTime]);

    useEffect(() => {
        if (!setWaitOrderCodeTime) return;
        const waitOrderCodeTimer = window.setInterval(() => {
            setWaitOrderCodeTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(waitOrderCodeTimer);
    }, [setWaitOrderCodeTime]);

    useEffect(() => {
        if (!setCancellationCountdown) return;
        const cancellationTimer = window.setInterval(() => {
            setCancellationCountdown((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(cancellationTimer);
    }, [setCancellationCountdown]);
};
