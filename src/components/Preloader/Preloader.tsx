import { FC } from 'react';
import styles from './Preloader.module.scss';

interface Preloader {
    /**
     * Text after preloder animation
     */
    text?: string;
}

const Preloader: FC<Preloader> = (props) => {
    const { text } = props;

    return (
        <div className={styles.preloader}>
            {text
                ? <p className={styles.preloader__text}>{text}</p>
                : <div className={styles.preloader__load}></div>}
        </div>
    );
};

export default Preloader;
