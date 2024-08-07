import { defaultStyles } from "@/styles"
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from "react-native"
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import DropDown from "../../../components/DropDown";
import { StatusBar } from "expo-status-bar";
import { InputField } from "../../../components/InputField";
import { useNavigation } from "expo-router";
import { colors, fontSize } from "@/constants/tokens";
import Icon from 'react-native-vector-icons/FontAwesome5';
import TankNameModal from "../../../components/TankModal";
import BottomSheet, { BottomSheetRefProps, MAX_Y } from "../../../components/BottomSheet";
import { TankCardProps } from "../../../components/TankCard";
import useOptions from "../../../hooks/UseOptions";
import { storeData } from "../../../data/DataBase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TankList from "../../../components/TankList";
import tanksData from "../../../../assets/TankData";
import useWeight from "../../../hooks/UseWeight";
import {getFillRate, getMaxWeight} from "@/utils/GetFillRate";
import parseNumber from "@/utils/ParseNumber";
import useSelectedTank from "../../../hooks/UseSelectedTank";
import isNotNan from "@/utils/NotNan";
import Tank from "@/constants/Tank";
import TankVisual, { TankRefProps } from "@/components/TankVisual";
import Spacer from "@/components/Spacer";
import getGrillHours from "@/utils/GetGrillHours";
import CircularSlider from "@/components/CircularSlider";

const HomeScreen = () => {
    const navigation = useNavigation();
    const ref = useRef<BottomSheetRefProps>(null)
    const tankRef = useRef<TankRefProps>(null)
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
        setSavedTank(tank);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false)
    }
    
    const handleSavedTank = (name: string) =>{
        if(!savedTank){
            console.log("bais")
        }
        else{
            const tank = new Tank(
                name, 
                savedTank!.emptyWeight, 
                savedTank!.liters, 
                savedTank!.Icon)
                addOption(tank, name);
                setModalVisible(false);

        }
    }
        
    const handleDeleteTank = (name: string) => {
        deleteOption(name);
    }

    const handleKnobChange = (setting: string) => {
        console.log(setting)
    }
    
    const fillPercent = getFillRate(
        selectedTank?.emptyWeight || 1, 
        parseNumber(inputValue), 
        selectedTank?.liters || 1, ) * 100

    useEffect(() => {
        if (tankRef.current && isValidNumber) {
            tankRef.current.fillTo(fillPercent);
        }
        else{
            tankRef.current!.fillTo(0)
        }
    }, [fillPercent]);
        
    const grillHours = getGrillHours(selectedTank?.emptyWeight || 1, parseNumber(inputValue))
        
    let displayText = '';
    let grillHourText = '';

    const isNumber = isNotNan(fillPercent) && selectedTank
    const isValidNumber = isNumber && fillPercent >= 0 && fillPercent < 100
    const tankNotChosen = isNotNan(fillPercent) && !selectedTank

    if (isValidNumber) {
        displayText = `${fillPercent.toFixed(1)} %`;
        grillHourText = `🔥 ${grillHours.low.toFixed(0)} timer\n🔥🔥 ${grillHours.med.toFixed(0)} timer\n🔥🔥🔥${grillHours.high.toFixed(0)} timer`;
    } else if(isNumber) {
        displayText = `Angi vekt mellom ${selectedTank.emptyWeight} og ${getMaxWeight(selectedTank.emptyWeight, selectedTank.liters).toFixed(1)} kg`;
    }
    
    if(tankNotChosen){
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
                    <View 
                        style = {{
                            width: 180,
                            top: 200,
                            start: 30,
                            paddingHorizontal: 20,
                            position: "absolute",
                            alignContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                        >
                        <TankVisual ref = {tankRef}>
                            <Text 
                                style = {{
                                    fontSize: fontSize.lg,
                                    color: colors.text,
                                    fontWeight: "700"
                                }}>
                                {displayText}
                            </Text>
                        </TankVisual>
                        <Spacer size={25} horizontal></Spacer>
                        <CircularSlider onSettingChange={handleKnobChange}></CircularSlider>
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