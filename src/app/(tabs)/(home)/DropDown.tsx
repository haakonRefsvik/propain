import { defaultStyles } from "@/styles";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { colors, fontSize, opacity } from "@/constants/tokens";
import { getAllData, getData, storeData } from "./DataBase";

interface Option {
    key: string;
    value: any;
}

export default function DropDown(){
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded])
    const [value, setValue] = useState("")
    const [options, setOptions] = useState<Option[]>([]);

    const onSelect = useCallback((item: {key: string}) => {
        setValue(item.key)
        setExpanded(false)
    }, [])

    useEffect(() => {
        const fetchAndSetData = async () => {
            const storedData = await getAllData();
            setOptions(storedData || []);  // Assume storedData is an array of items for the dropdown
        };
        
        fetchAndSetData();
    }, []);
    
    return (
        <View>
            <TouchableOpacity 
                style = {inputstyles.button}
                onPress={toggleExpanded}
                activeOpacity={0.8}
            >
                <Text style = {inputstyles.dropdowntitle}>{value || "Velg tank"}</Text>
                <AntDesign 
                    name = {expanded ? "caretup": "caretdown"} 
                    color={colors.primary}
                />
            </TouchableOpacity>
            {expanded ? (
                <View style = {inputstyles.options}>
                <FlatList
                    keyExtractor={(item) => item.key}
                    data = {options}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            style = {inputstyles.optionItem}
                            onPress={() => onSelect(item)}
                        >
                            <Text style = {inputstyles.optiontext}>{item.key}</Text>
                        </TouchableOpacity>
                    )}
                />
                </View>
            ): null}
        </View>
    )
}

export const inputstyles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.container,
        fontWeight: 'bold',
        color: colors.text,
        borderRadius: 5,
    },
    dropdowntitle:{
        color: colors.text,
        opacity: opacity.low,
        fontSize: fontSize.sm
    },
    optiontext: {
        color: colors.text,
        fontSize: fontSize.sm
    },
    optionItem: {
        height: 40,
        justifyContent: "center",
        color: "red",
    },
    options: {
        position: "absolute",
        top: 53, 
        backgroundColor: colors.container,
        width: "100%",
        padding: 20,
        borderRadius: 6,
        maxHeight: 250,
    },

    button: {
        height: 50,
        justifyContent: "space-between",
        backgroundColor: colors.container,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
    }
})