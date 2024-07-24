import { defaultStyles } from "@/styles"
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from "react-native"
import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import DropDown from "./DropDown";
import { StatusBar } from "expo-status-bar";
import { InputField } from "./InputField";
import { useNavigation } from "expo-router";
import { colors, fontSize } from "@/constants/tokens";
import Icon from 'react-native-vector-icons/FontAwesome5';
import TankNameModal from "./Modal";
import BottomSheet, { BottomSheetRefProps, MAX_Y } from "./BottomSheet";
import { TankCardProps } from "./TankCard";
import useOptions from "./UseOptions";
import { storeData } from "./DataBase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TankList from "./TankList";
import tanksData from "../../../../assets/TankData";
import useWeight from "./UseWeight";
import {getFillRate, getMaxWeight} from "@/utils/GetFillRate";
import parseNumber from "@/utils/ParseNumber";
import useSelectedTank from "./UseSelectedTank";
import Tank from "./Tank";
import isNotNan from "@/utils/NotNan";

const HomeScreen = () => {
    const navigation = useNavigation();
    const ref = useRef<BottomSheetRefProps>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [savedTank, setSavedTank] = useState<TankCardProps>()
    const { options, deleteOption, addOption} = useOptions();
    const { inputValue, handleInputChange } = useWeight();
    const { selectedTank, selectTank } = useSelectedTank();

    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if(isActive){
            ref?.current?.scrollTo(0);
        }
        else{
            ref?.current?.scrollTo(MAX_Y);
        }
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Hjem',
            headerRight: () => (
                <TouchableOpacity onPress={onPress} style={defaultStyles.button}>
                    <Icon name="plus" size={20} color={colors.primary} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, onPress]);

    const handleTankPress = (tank: TankCardProps) => {
        console.log(tank.liters)
        setSavedTank(tank);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleSavedTank = (name: string) =>{
        const tank = new Tank(
            name, 
            savedTank!.emptyWeight, 
            savedTank!.liters, 
            savedTank!.Icon)
        addOption(tank, name);
        setModalVisible(false);
    }

    const handleDeleteTank = (name: string) => {
        deleteOption(name);
    }

    const fillPercent = getFillRate(
        selectedTank?.emptyWeight || 1, 
        parseNumber(inputValue), 
        selectedTank?.liters || 1, ) * 100

    let displayText = '';


    if (isNotNan(fillPercent) && selectedTank) {
        if (fillPercent >= 0 && fillPercent < 100) {
            displayText = `Fyllingsgrad ${fillPercent.toFixed(1)} %`;
        } else {
            displayText = `Angi vekt mellom ${selectedTank.emptyWeight} og ${getMaxWeight(selectedTank.emptyWeight, selectedTank.liters).toFixed(1)} kg`;
        }
    }
    else if(isNotNan(fillPercent) && !selectedTank){
        displayText = "Velg en tank"
    }

    return (
        <GestureHandlerRootView>
            <BottomSheet ref = {ref}>
                <Text style = {{color: colors.text, fontSize: fontSize.lg, fontWeight: "bold"}}>
                    Legg til en tank
                </Text>
                <TankList 
                    tanks={tanksData}
                    onTankPress={handleTankPress}
                ></TankList>
            </BottomSheet>
            
            <SafeAreaView style={defaultStyles.container}>
                <View style = {defaultStyles.container}>
                    <StatusBar style = "light"/>
                    <View style = {defaultStyles.dropdowncontainer}>
                    <DropDown
                        deleteTank={handleDeleteTank}
                        options={options} 
                        onSelect={selectTank}
                    />
                    </View>
                    <View style = {defaultStyles.inputfieldcontainer}>
                        <InputField 
                            label="Angi vekt (kg)"
                            value={inputValue}
                            onChange={handleInputChange}
                            >
                        </InputField>
                    </View>
                    <View style = {defaultStyles.inputfieldcontainer}>
                        <Text style = {defaultStyles.text}>{displayText}</Text>
                    </View>
                </View>
                <TankNameModal 
                    visible={modalVisible} 
                    onClose={handleCloseModal} 
                    onSave={handleSavedTank}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

export default HomeScreen