import { defaultStyles } from "@/styles"
import { Button, StyleSheet, Text, View, ScrollView, TextInput} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from "@/constants/tokens";
import DropDown from "./DropDown";
import Spacer from "./Spacer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "./BottomSheet";
import { InputField } from "./InputField";
import { TankCard } from "./TankCard";
import card from "assets/Vector 1.svg"

const HomeScreen = () => {
    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style = {defaultStyles.container}>

                <StatusBar style = "light"/>
                <View style = {defaultStyles.dropdowncontainer}>
                    <DropDown></DropDown>
                </View>
                <View style = {defaultStyles.inputfieldcontainer}>
                    <InputField label="Angi vekt (kg)"></InputField>
                </View>
                <View style = {defaultStyles.inputfieldcontainer}>
                    <TankCard liters = {25} svg={card}></TankCard>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen
