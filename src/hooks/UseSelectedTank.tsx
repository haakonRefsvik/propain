import { useState, useCallback } from 'react';
import { TankCardProps } from '../components/TankCard';
import Tank from '../constants/Tank';
const useSelectedTank = () => {
    const [selectedTank, setSelectedTank] = useState<Tank | null>(null);

    const selectTank = useCallback((tank: Tank) => {
        setSelectedTank(tank);
    }, []);

    return { selectedTank, selectTank };
};

export default useSelectedTank;