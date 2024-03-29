import { FC, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../services/store";
// import { setEstimatedTime } from './../../services/slices/progressBarSlice'; // для передачи в store ожидаемого времени
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
    barColor?: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ barColor = '#ff8f0b' }) => {
    const [progress, setProgress] = useState(0);
    const estimatedTime = useSelector((state: RootState) => state.orderTime.estimatedTime);
    const totalMilliseconds = estimatedTime * 60 * 1000;

    useEffect(() => {
        let start: number | null = null;
        let animationFrameId: number;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            if (elapsed < totalMilliseconds) {
                setProgress((elapsed / totalMilliseconds) * 100);
                animationFrameId = requestAnimationFrame(step);
            } else {
                setProgress(100);
            }
        };

        animationFrameId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrameId);

    }, [estimatedTime]);

    const barStyle = { width: `${progress}%`, backgroundColor: barColor };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle}></div>
        </div>
    );
};

export default ProgressBar;
