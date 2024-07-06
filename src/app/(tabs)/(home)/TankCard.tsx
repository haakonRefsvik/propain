import { colors, fontSize, opacity } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Image} from "react-native";
import Spacer from "./Spacer";
import Svg, { Path, SvgProps } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { getData, storeData } from './DataBase';

export interface TankCardProps{
    emptyWeight: number;
    liters: number;
    Icon: React.FC<SvgProps & { color?: string }>;
    svgColor?: string;
}



export const TankCard: React.FC<TankCardProps> = ({emptyWeight, liters, Icon, svgColor}) =>{

    const addTank = async () => {
        try {
            await storeData(liters, "my tank");
            console.log('Data stored successfully.');
            // Optionally, you can do something after storing data
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };
    

    getData("my tank")

    return(
        <View>
            <TouchableOpacity
                style = {styles.cardcontainer}
                activeOpacity={0.8}
                onPress={addTank}
            >
            <View>
                <Text style = {{
                    fontSize: fontSize.lg, 
                    fontWeight: "500", 
                    color: colors.text}}>
                    {liters} L
                </Text>
                <Spacer size={5}></Spacer>
                <Text style = {{
                    fontSize: fontSize.xs, 
                    fontWeight: "500", 
                    opacity: opacity.low,
                    color: colors.text}}>
                    Empty weight: {emptyWeight} kg
                </Text>
            </View>
            
            <View style={styles.svgcontainer}>
                <Spacer size={50} horizontal></Spacer>
                <Icon width="100%" height="35%" color={svgColor}/>
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
        borderRadius: 8,
    }
})
