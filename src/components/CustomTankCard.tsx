import { colors, fontSize, opacity } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Image, TextInput} from "react-native";
import Spacer from "./Spacer";
import Svg, { Path, SvgProps } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { inputstyles } from "./DropDown";
import { InputFieldSmall } from "./InputFieldSmall";
import useWeight from "@/hooks/UseWeight";

export interface TankCardProps{
    emptyWeight: number;
    liters: number;
    svgColor?: string;
    onPress?: () => void;
}

export const CustomTankCard: React.FC<TankCardProps> = ({onPress}) =>{
    const [liters, setLiters] = useState<string>("")
    const [emptyWeight, setEmptyWeight] = useState<string>("")

    return(
        <View>
            <TouchableOpacity
                style = {styles.cardcontainer}
                activeOpacity={0.8}
                onPress={onPress}
            >
            <View>
                <Text style = {{
                    fontSize: fontSize.xs, 
                    fontWeight: "500", 
                    opacity: opacity.low,
                    color: colors.text}}>
                    Egendefinert tank
                </Text>
                <Spacer size={7}></Spacer>
                <InputFieldSmall 
                    value = {liters} 
                    label="liter"
                    onChange={setLiters}    
                ></InputFieldSmall>
            </View>
            <View>
                <Spacer size={20}></Spacer>
                <InputFieldSmall 
                    value = {emptyWeight} 
                    label="vekt (n)"
                    onChange={setEmptyWeight}    
                ></InputFieldSmall>
            </View>

            <View style={styles.svgcontainer}>
                <Spacer size={50} horizontal></Spacer>
                <Icon name="hammer" size={25} style = {styles.customIcon}/>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputfield: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.container,
        fontWeight: 'bold',
        color: colors.text,
        borderRadius: 5,
    },
    customIcon: {
        color: colors.primary
    },
    svgcontainer: {
        flexDirection: "row",
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardcontainer: {
        height: 80,
        justifyContent: "space-between",
        backgroundColor: colors.sheetContainer,
        flexDirection: "row",
        width: 400,
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: 14,
    }
})
