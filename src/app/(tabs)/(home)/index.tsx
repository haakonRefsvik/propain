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
import getFillRate from "@/utils/GetFillRate";
import parseNumber from "@/utils/ParseNumber";

const HomeScreen = () => {
    const navigation = useNavigation();
    const ref = useRef<BottomSheetRefProps>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTank, setSelectedTank] = useState<TankCardProps>()
    const { options, deleteOption, addOption} = useOptions();
    const { inputValue, handleInputChange } = useWeight();

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
        setSelectedTank(tank);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleSavedTank = (name: string) =>{
        addOption(selectedTank!.liters, name);
        setModalVisible(false);
    }

    const handleDeleteTank = (name: string) => {
        deleteOption(name);
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
                        <Text style = {defaultStyles.text}>Fyllingsgrad {

                            getFillRate(
                                selectedTank?.emptyWeight || 1, 
                                parseNumber(inputValue), 
                                selectedTank?.liters || 1)
                            * 100
                            }
                            %
                        </Text>
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