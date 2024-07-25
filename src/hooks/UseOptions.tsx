import { useState, useEffect, useCallback } from "react";
import { deleteData, getAllData, storeData } from "../data/DataBase";
import Tank from "../constants/Tank";

 
// hook for the options in the dropDownMenu
const useOptions = () => {
    const [options, setOptions] = useState<Tank[]>([]);

    const updateOptions = useCallback(async () => {
        const storedData = await getAllData();

        setOptions(storedData || []);  // Assume storedData is an array of items for the dropdown
    }, []);

    useEffect(() => {
        updateOptions();
    }, [updateOptions]);

    const addOption = useCallback((tank: Tank, key: string) => {
        storeData(key, tank).then(() => {
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


