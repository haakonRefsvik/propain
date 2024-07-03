import { defaultStyles } from "@/styles"
import { Button, StyleSheet, Text, View, StatusBar, ScrollView, TextInput} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from "@/constants/tokens";
import DropDown from "./DropDown";
import InputField from "./InputField";
import Spacer from "./Spacer";


const SongsScreen = () => {
    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style = {defaultStyles.dropdowncontainer}>
                <DropDown></DropDown>

            </View>
            <View style = {defaultStyles.inputfieldcontainer}>
                <InputField></InputField>
            </View>

        </SafeAreaView>
    );
}

export default SongsScreen
