import { FC, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectStartTime, selectEstimatedTime } from "../../services/selectors/progressBarSelectors";
import styles from './ProgressBar.module.scss';

const ProgressBar: FC = () => {
    const [progress, setProgress] = useState(0);
    const startTime = useSelector(selectStartTime);
    const estimatedTime = useSelector(selectEstimatedTime);
    const totalMilliseconds = estimatedTime * 1000;

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
    }, [startTime, estimatedTime, totalMilliseconds]);

    const barStyle = {
        width: `${progress}%`,
        backgroundColor: progress < 100 ? '#ff8f0b' : '#f05252',
    };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle}/>
        </div>
    );
};

export default ProgressBar;
