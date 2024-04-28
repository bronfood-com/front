import { useEffect } from 'react';

export const useEsc = (handleFunction: () => void, isForegroundPopupOpen: boolean = false) => {
    useEffect(() => {
        if (!isForegroundPopupOpen) {
            const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && handleFunction();
            document.addEventListener('keydown', handleCloseByEsc);
            return () => document.removeEventListener('keydown', handleCloseByEsc);
        }
    });
};
