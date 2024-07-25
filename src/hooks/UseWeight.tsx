import { useState, useCallback } from 'react';

const useWeight = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = useCallback((value: string) => {
        setInputValue(value);
    }, []);

    return { inputValue, handleInputChange };
}

export default useWeight;