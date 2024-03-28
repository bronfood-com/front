import { useState, useEffect } from "react";

export const useCountdown = (estimatedTime: number) => {
    const [remainingTime, setRemainingTime] = useState<number>(estimatedTime);

    useEffect(() => {
        const endTime = Date.now() + estimatedTime * 60 * 1000;
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = (endTime - currentTime) / 1000 / 60;
            setRemainingTime(timeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [estimatedTime]);

    return Math.round(remainingTime);
};
