import { useEffect } from 'react';

/**
 * Invokes 'handleFunction' when user clicks on 'Esc'
 *
 * @param {} handleFunction
 */
export const useEsc = (handleFunction: () => void) => {
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && handleFunction();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    }, [handleFunction]);
};
