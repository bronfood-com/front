import { FC, useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
    duration?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ duration = 120 }) => { // По умолчанию 2 минуты
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const newProgress = elapsedTime / (duration * 1000);

            setProgress(newProgress);

            if (currentTime >= endTime) {
                clearInterval(interval);
                setProgress(1);
            }
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [duration]);

    const progressBarWidth = `${progress * 100}%`;

    return (
        <div className={styles.progressBar}>
            <div
                className={styles.progressBar__line}
                style={{ width: progressBarWidth, transition: `width ${duration}s linear` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
