import { StackScreenWithSearchBar } from "@/constants/layout"
import { colors, fontSize } from "@/constants/tokens"
import {defaultStyles} from "@/styles"
import { Stack } from "expo-router"
import React, { useCallback, useRef, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetRefProps, MAX_Y } from "./BottomSheet"
import TankList from "./TankList"
import Spacer from "./Spacer"
import { TankIcon12L, TankIcon18L, TankIcon24L, TankIcon26L, TankIcon27L, TankIcon33L} from "./TankSVG"
import { TankCardProps } from "./TankCard"
import { storeData } from "./DataBase"
import TankNameModal from "./Modal"

const tanksData = [
    { liters: 12.5, emptyWeight: 3.4, svgColor: colors.primary, Icon: TankIcon12L},
    { liters: 18.2, emptyWeight: 4.1, svgColor: colors.primary, Icon: TankIcon18L},
    { liters: 24.5, emptyWeight: 5, svgColor: colors.primary, Icon: TankIcon24L},
    { liters: 26.2, emptyWeight: 5.1, svgColor: colors.primary, Icon: TankIcon26L},
    { liters: 27.4, emptyWeight: 5.3, svgColor: colors.primary, Icon: TankIcon27L},
    { liters: 33.5, emptyWeight: 7.5, svgColor: colors.primary, Icon: TankIcon33L}
];

export const HomeScreenLayout = () => {
    const ref = useRef<BottomSheetRefProps>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTank, setSelectedTank] = useState<TankCardProps>()
    
    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if(isActive){
            ref?.current?.scrollTo(0);
        }
        else{
            ref?.current?.scrollTo(MAX_Y);
        }
    }, [])
    
    const handleTankPress = (tank: TankCardProps) => {
        console.log(tank.liters)
        setSelectedTank(tank);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleSavedTank = (name: string) =>{
        console.log("tank %s name was %s", selectedTank?.liters, name)
        storeData(selectedTank!.liters, name)
        setModalVisible(false);
    }

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <BottomSheet ref = {ref}>
                <Text style = {{color: colors.text, fontSize: fontSize.lg, fontWeight: "bold"}}>
                    Legg til en tank
                </Text>
                <TankList 
                    tanks={tanksData}
                    onTankPress={handleTankPress}
                ></TankList>
            </BottomSheet>
            <Stack>
                <Stack.Screen 
                    name="index"
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: 'Hjem',
                        headerRight: () => (
                            <TouchableOpacity
                            onPress={onPress}
                            style={defaultStyles.button}
                            >
                                <Icon name="plus" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
                <TankNameModal 
                    visible={modalVisible} 
                    onClose={handleCloseModal} 
                    onSave={handleSavedTank}
                />
        </GestureHandlerRootView>
    );
};

export default HomeScreenLayout