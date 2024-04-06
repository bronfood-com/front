import { FC, useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps1 {
    initialTime: number;
    currentTime: number;
}

const ProgressBar1: FC<ProgressBarProps1> = ({ initialTime, currentTime }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentTime >= 0) {
            const updatedProgress = ((initialTime - currentTime) / initialTime) * 100;
            setProgress(updatedProgress);
        } else {
            setProgress(100);
        }
    }, [initialTime, currentTime]);

    const barStyle = {
        width: `${progress}%`,
        backgroundColor: currentTime < 0 ? '#f05252' : '#ff8f0b',
    };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle} />
        </div>
    );
};

export default ProgressBar1;
