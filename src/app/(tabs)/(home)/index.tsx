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
import { TankCardProps } from "../../../components/TankCard";
import BottomSheet, { BottomSheetRefProps, MAX_Y } from "../../../components/BottomSheet";
import useOptions from "../../../hooks/UseOptions";
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
import {KnobOption, getClosestOption} from "@/utils/Setting";
import getMinutesFromHour from "@/utils/GetMinutesFromHour";
import { TankIcon12L, TankIcon18L, TankIcon24L, TankIconProps } from "@/assets/TankSVG";
import CustomModal from "@/components/CustomModal";

const HomeScreen = () => {
    const navigation = useNavigation();
    const ref = useRef<BottomSheetRefProps>(null)
    const tankRef = useRef<TankRefProps>(null)
    const [knobPosition, setKnobPosition] = useState<number>(0); // Initialize with your default option
    const [modalVisible, setModalVisible] = useState(false);
    const [customModalVisible, setCustomModalVisible] = useState(false);
    const [savedTank, setSavedTank] = useState<TankCardProps>()
    const { options, deleteOption, addOption} = useOptions();
    const { inputValue, handleInputChange } = useWeight();
    const { selectedTank, selectTank } = useSelectedTank();
    const [grillHour, setGrillHour] = useState<number>(0);
    
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
        setCustomModalVisible(false)
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

    const handleError = () => {
        setCustomModalVisible(true)
    }
        
    const handleDeleteTank = (name: string) => {
        deleteOption(name);
    }

    const handleKnobPositionChange = (newPosition: number) => {
        setKnobPosition(newPosition);
    };
        
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

    useEffect(() => {
        const opt = getClosestOption(knobPosition)
        const hours = getGrillHours(selectedTank?.emptyWeight || 1, parseNumber(inputValue) || 1, opt)
        setGrillHour(hours)
    }, [knobPosition, fillPercent]);

    let displayText = '';
    let grillHourText = '\n';

    const isNumber = isNotNan(fillPercent) && selectedTank
    const isValidNumber = isNumber && fillPercent >= 0 && fillPercent < 100
    const tankNotChosen = isNotNan(fillPercent) && !selectedTank

    if (isValidNumber) {
        const min = getMinutesFromHour(grillHour)
        displayText = `${fillPercent.toFixed(1)} %`;
        grillHourText = `${Math.floor(grillHour)} timer\n${Math.floor(min)} minutter`
    } else if(isNumber) {
        const minWeight = selectedTank.emptyWeight;
        const maxWeight = getMaxWeight(minWeight, selectedTank.liters).toFixed(1);
        displayText = `Angi vekt mellom ${minWeight} og ${maxWeight} kg`;
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
                <Spacer size={10}></Spacer>
                <Text style = {{color: colors.text, fontSize: fontSize.sm, opacity: 0.7}}>
                    Hva slags tank vil du legge til?
                </Text>
                <TankList 
                    tanks={tanksData}
                    onTankPress={handleTankPress}
                    onError={handleError}
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
                        <TankVisual ref = {tankRef} Icon={TankIcon24L}>
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
                        <View>
                            <CircularSlider
                                knobPosition={knobPosition}  // Pass current knob position
                                onPositionChange={handleKnobPositionChange} // Pass the handler
                            />                            
                            <Spacer size={24}></Spacer>
                            <Text style = {{
                                fontSize: fontSize.sm,
                                color: "grey"
                            }}>{grillHourText}</Text>    
                        </View>
                    </View>
                </View>
                <TankNameModal 
                    existingTanks={options}
                    visible={modalVisible} 
                    onClose={handleCloseModal} 
                    onSave={handleSavedTank}
                />
                <CustomModal
                    visible = {customModalVisible}
                    onClose={handleCloseModal
                    }
                >
                    <Text style = {defaultStyles.text}>Liter eller vekt kan ikke være 0</Text>
                </CustomModal>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

export default HomeScreen