import { FC, useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
    duration: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ duration }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalTime = duration;
        const updateInterval = 10;

        const totalUpdates = intervalTime / updateInterval;
        const progressStep = 1 / totalUpdates;

        const interval = setInterval(() => {
            setProgress((currentProgress) => {
                const updatedProgress = currentProgress + progressStep;
                if (updatedProgress >= 1) {
                    clearInterval(interval);
                    return 1;
                }
                return updatedProgress;
            });
        }, updateInterval);

        return () => clearInterval(interval);
    }, [duration]);

    const progressBarWidth = `${progress * 100}%`;

    return (
        <div className={styles.progressBar}>
            <div
                className={styles.progressBar__line}
                style={{ width: progressBarWidth }}
            ></div>
        </div>
    );
};

export default ProgressBar;
