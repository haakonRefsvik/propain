import { useState, useEffect, useCallback } from "react";
import { deleteData, getAllData, storeData } from "./DataBase";


interface Option {
    key: string;
    value: string;
}
 
// hook for the options in the dropDownMenu
const useOptions = () => {
    const [options, setOptions] = useState<Option[]>([]);

    const updateOptions = useCallback(async () => {
        const storedData = await getAllData();

        setOptions(storedData || []);  // Assume storedData is an array of items for the dropdown
    }, []);

    useEffect(() => {
        updateOptions();
    }, [updateOptions]);

    const addOption = useCallback((value: number, key: string) => {
        storeData(value, key).then(() => {
            updateOptions();
        })
    }, [updateOptions])

    const deleteOption = useCallback((key: string) => {
        deleteData(key).then(() => {
            updateOptions();
        })
    }, [updateOptions]);

    return { options, addOption, deleteOption };

}

export default useOptions


