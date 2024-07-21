import { defaultStyles } from "@/styles";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { colors, fontSize, opacity } from "@/constants/tokens";
import { getAllData, getData, storeData } from "./DataBase";
import useOptions from "./UseOptions";
import Icon from 'react-native-vector-icons/FontAwesome6';
import Spacer from "./Spacer";

type DropDownProps = {
    options: { key: string; value: string }[]; // Options received from the parent
    deleteTank: (key: string) => void;
};

export default function DropDown({ options, deleteTank }: DropDownProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded])
    const [value, setValue] = useState("")
    
    const onSelect = useCallback((item: {key: string}) => {
        setValue(item.key)
        setExpanded(false)
    }, [])

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
                            <Text style = {inputstyles.optionValuetext}>{item.value} L</Text>
                            <TouchableOpacity onPress={() => deleteTank(item.key)}>
                                <Icon name="xmark" size={17} style = {inputstyles.removeButton}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
                </View>
            ): null}
        </View>
    )
}

export const inputstyles = StyleSheet.create({
    removeButton: {
        color: colors.text,
        opacity: 0.4,
    },
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
        fontSize: fontSize.sm,
        width: "20%"
    },
    optionValuetext: {
        paddingHorizontal: 0,
        color: colors.text,
        fontSize: fontSize.sm - 2,
        opacity: opacity.low
    },
    optionItem: {
        height: 40,
        color: "red",
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
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