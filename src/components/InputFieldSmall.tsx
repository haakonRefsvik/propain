import React, { useCallback, useRef, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, TextInput, StyleSheet} from "react-native";
import { inputstyles } from "./DropDown";
import { colors } from "@/constants/tokens";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
}

export const InputFieldSmall: React.FC<InputFieldProps> = ({ label , value, onChange }) =>{
    const inputRef = useRef<TextInput>(null);
    const [focused, setFocused] = useState(false);

    const handlePress = useCallback(() => {
        if (focused) {
            inputRef.current?.blur();
        } else {
            inputRef.current?.focus();
        }
        setFocused(!focused);
    }, [focused]);


    const handleChangeText = (text: string) => {
        onChange(text);
    };

    return (
        <View>
            <TouchableOpacity 
                style = {styles.inputcontainer}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                {value === '' && (
                    <Text style = {inputstyles.dropdowntitle}>{label}</Text>
                )}
                <TextInput
                    keyboardType="numeric"
                    ref={inputRef}
                    style = {styles.inputfield}
                    maxLength = {5}
                    value={value}
                    onChangeText={handleChangeText}
                >
                </TextInput>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputfield: {
        position: "absolute",
        height: 50,
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "transparent",
        fontWeight: 'bold',
        color: colors.text,
        borderRadius: 5,
    },
    inputcontainer: {
        height: 40,
        justifyContent: "space-between",
        backgroundColor: colors.container,
        flexDirection: "row",
        width: 90,
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
    },
})
