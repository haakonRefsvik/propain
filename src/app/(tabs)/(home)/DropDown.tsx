import { defaultStyles } from "@/styles";
import React, { useCallback, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { colors, fontSize, opacity } from "@/constants/tokens";
import { getAllData, getData, storeData } from "./DataBase";


export default function DropDown(){
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded])
    const [value, setValue] = useState("")

    const onSelect = useCallback((item: {value: string; label: string}) => {
        setValue(item.value)
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
                    keyExtractor={(item) => item.value}
                    data = {[
                        {value: "Heh", label: "h"},
                        {value: "Heh2", label: "h2"},
                        
                    ]}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            style = {inputstyles.optionItem}
                            onPress={() => onSelect(item)}
                        >
                            <Text style = {inputstyles.optiontext}>{item.value}</Text>
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