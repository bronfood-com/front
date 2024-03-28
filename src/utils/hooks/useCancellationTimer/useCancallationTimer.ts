import { useState, useEffect } from "react";

export const useCancellationTimer = (initialTime: number) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [canCancel, setCanCancel] = useState(true);

    useEffect(() => {
        if (remainingTime <= 0) {
            setCanCancel(false);
            return;
        }

        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime]);

    return { remainingTime, canCancel };
};
