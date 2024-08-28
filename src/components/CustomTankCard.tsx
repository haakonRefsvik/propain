import { colors, fontSize, opacity } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Image} from "react-native";
import Spacer from "./Spacer";
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface TankCardProps{
    emptyWeight: number;
    liters: number;
    Icon: React.FC<SvgProps & { color?: string }>;
    svgColor?: string;
    onPress?: () => void;
}

export const CustomTankCard: React.FC<TankCardProps> = ({emptyWeight, liters, Icon, svgColor, onPress}) =>{
    
    return(
        <View>
            <TouchableOpacity
                style = {styles.cardcontainer}
                activeOpacity={0.8}
                onPress={onPress}
            >
            <View>
                <Spacer size={5}></Spacer>
                <Text style = {{
                    fontSize: fontSize.xs, 
                    fontWeight: "500", 
                    opacity: opacity.low,
                    color: colors.text}}>
                    Egendefinert tank {emptyWeight}
                </Text>
            </View>
            
            <View style={styles.svgcontainer}>
                <Spacer size={50} horizontal></Spacer>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
