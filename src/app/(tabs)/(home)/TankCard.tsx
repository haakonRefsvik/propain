import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Image} from "react-native";
import Spacer from "./Spacer";
import Svg, { Path } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

interface TankCardProps{
    liters: number;
    svg: {
        svgXml: string;
        width?: number | string;
        height?: number | string;
    };
}


export const TankCard: React.FC<TankCardProps> = ({liters, svg}) =>{
    const svgContent = svg.svgXml

    return(
        <View>
            <TouchableOpacity
                style = {styles.cardcontainer}
            >
            <Text style = {defaultStyles.text}>{liters} L</Text>
            <View style={styles.svgcontainer}>
                <SvgXml xml={svgContent} width="100%" height="100%" />
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    svgcontainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardcontainer: {
        height: 100,
        justifyContent: "space-between",
        backgroundColor: colors.sheetContainer,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 25,
        borderRadius: 8,
    }
})
