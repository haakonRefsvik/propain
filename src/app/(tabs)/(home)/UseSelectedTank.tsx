import { useState, useCallback } from 'react';

const useSelectedTank = () => {
    const [selectedTank, setSelectedTank] = useState<{ key: string, value: string } | null>(null);

    const selectTank = useCallback((tank: { key: string, value: string }) => {
        setSelectedTank(tank);
    }, []);

    return { selectedTank, selectTank };
};

export default useSelectedTank;