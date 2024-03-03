import { FC, ReactNode, useEffect, MouseEvent } from 'react';
import styles from './Filter.module.scss';

interface Filter {
    onClose: () => void;
    children: ReactNode;
}

const Filter: FC<Filter> = (props) => {
    const handleCloseButton = () => {
        props.onClose();
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && props.onClose();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.filter_overlay} onClick={handleOverlayClick}>
            <div className={`${styles.filter} ${styles[`filter_${props.mode}`]}`}>
                {props.title && <h2 className={`${styles.filter__title} ${styles[`filter__title_${props.mode}`]}`}>{props.title}</h2>}
                {props.children}
                <button className={`${styles.filter__close} ${styles[`filter__close_${props.mode}`]} button`} type="button" onClick={handleCloseButton}></button>
            </div>
        </div>
    );
};

export default Filter;
