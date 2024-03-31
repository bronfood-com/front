import { FC, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../services/store";
import styles from './ProgressBar.module.scss';

const ProgressBar: FC = () => {
    const [progress, setProgress] = useState(0);
    const startTime = useSelector((state: RootState) => state.progressBar.startTime);
    const estimatedTime = useSelector((state: RootState) => state.progressBar.estimatedTime);
    const totalMilliseconds = estimatedTime * 60 * 1000;

    useEffect(() => {
        if (!startTime) return;

        const end = new Date(startTime).getTime() + totalMilliseconds;
        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - new Date(startTime).getTime();
            if (now < end) {
                setProgress((elapsed / totalMilliseconds) * 100);
                requestAnimationFrame(updateProgress);
            } else {
                setProgress(100);
            }
        };

        updateProgress();
    }, [startTime, estimatedTime]);

    const barStyle = {
        width: `${progress}%`,
        backgroundColor: progress < 100 ? '#ff8f0b' : '#f05252',
    };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle}></div>
        </div>
    );
};

export default ProgressBar;
