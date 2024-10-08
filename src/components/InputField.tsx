import React, { useCallback, useRef, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, TextInput } from "react-native";
import { inputstyles } from "./DropDown";
import { colors } from "@/constants/tokens";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ label , value, onChange }) =>{
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
                style = {inputstyles.button}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Text style = {inputstyles.dropdowntitle}>{label}</Text>
                <TextInput
                    keyboardType="numeric"
                    ref={inputRef}
                    style = {inputstyles.input}
                    maxLength = {10}
                    value={value}
                    onChangeText={handleChangeText}
                >
                </TextInput>
            </TouchableOpacity>
        </View>
    )
}