import { FC, useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
    estimatedTime: number; // указыввать в минутах
    barColor?: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ estimatedTime, barColor = '#ff8f0b' }) => {
    const [progress, setProgress] = useState(0);
    const totalMilliseconds = estimatedTime * 60 * 1000;

    useEffect(() => {
        let start: number | null = null;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            if (elapsed < totalMilliseconds) {
                setProgress((elapsed / totalMilliseconds) * 100);
                requestAnimationFrame(step);
            } else {
                setProgress(100);
            }
        };

        requestAnimationFrame(step);

    }, [estimatedTime, totalMilliseconds]);

    const barStyle = { width: `${progress}%`, backgroundColor: barColor };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle}></div>
        </div>
    );
};

export default ProgressBar;
