import { defaultStyles } from "@/styles"
import { Button, StyleSheet, Text, View, ScrollView, TextInput} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from "@/constants/tokens";
import DropDown from "./DropDown";
import InputField from "./InputField";
import Spacer from "./Spacer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "./BottomSheet";


const HomeScreen = () => {
    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style = {defaultStyles.container}>

                <StatusBar style = "light"/>
                <View style = {defaultStyles.dropdowncontainer}>
                    <DropDown></DropDown>
                </View>
                <View style = {defaultStyles.inputfieldcontainer}>
                    <InputField></InputField>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen
