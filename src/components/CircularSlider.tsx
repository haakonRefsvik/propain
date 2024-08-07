import {Dimensions, StyleSheet, Text, View} from "react-native"
import React, { useCallback, useEffect, useImperativeHandle } from "react"
import Spacer from "./Spacer";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { colors, fontSize, opacity } from "@/constants/tokens";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/styles";
import Icon from 'react-native-vector-icons/FontAwesome6';

interface CircularSliderProps {
    onSettingChange: (setting: string) => void;
}

const CircularSlider: React.FC<CircularSliderProps> = ({onSettingChange}) => {
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})
    
    const chosenSetting = useDerivedValue(() => {
        return closest(translateY.value % 360, [0, 90, -90]);
    }, [translateY]);
    
    const scrollTo = useCallback((destination: number) => {
        "worklet";
        
        translateY.value = withSpring(destination, {damping: 70, stiffness: 700})
    }, [])
    
    const gesture = Gesture.Pan()
    .onStart(() =>{
        context.value = { y: translateY.value }
    })
    .onUpdate(({ translationY }) => {
        translateY.value = (translationY % 360 )+ context.value.y
    })
    .onEnd(() => {
        scrollTo(chosenSetting.value)
    })
    
    const AnimationStyle = useAnimatedStyle (() => {
        return {
            transform: [{rotateZ: `${translateY.value}deg` }]
        } 
    });
    
    const idleTextColor = "grey"
    const chosenTextColor = colors.primary
    
    const lowTextStyle = useAnimatedStyle(() => {
        return {
            color: chosenSetting.value === -90 ? chosenTextColor : idleTextColor,
            ...styles.lowtext
        };
    });
    
    const medTextStyle = useAnimatedStyle(() => {
        return {
            color: chosenSetting.value === 0 ? chosenTextColor : idleTextColor,
            ...styles.medtext
        };
    });
    
    const highTextStyle = useAnimatedStyle(() => {
        return {
            color: chosenSetting.value === 90 ? chosenTextColor : idleTextColor,
            ...styles.hightext
        };
    });
    
    return(
        <View style = {styles.container}>
            <Animated.Text style={[styles.text, lowTextStyle]}> LOW </Animated.Text>
            <View style = {styles.knobcontainer}>
            <Animated.Text style={[styles.text, medTextStyle]}> MEDIUM </Animated.Text>
                <GestureDetector gesture={gesture}>
                    <Animated.View style = {[styles.knob, AnimationStyle]}>

                            <View style = {styles.thumbline}/>
                            <Icon name="fire" size={25} style = {styles.grillicon}/>
                            <Text></Text>
                        </Animated.View>
                </GestureDetector>
            </View>
            <Animated.Text style={[styles.text, highTextStyle]}> HIGH </Animated.Text>
        </View>
    )
}


export default CircularSlider

const styles = StyleSheet.create({
    
    grillicon: {
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
        color: "grey"
    },
    container: {
        flexDirection: "row",
    },
    knobcontainer: {
        flexDirection: "column",
        alignContent: "center"
    },
    text: {
        fontWeight: "700",
        fontSize: fontSize.xs
    },
    lowtext: {
        top: 60,
        right: 5,
    },
    medtext: {
        alignSelf: "center",
        bottom: 10,
    },
    hightext: {
        top: 60,
        left: 5,
    },
    knob: {
        
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.sheetContainer,
        width: 100,
        height: 100,
        borderRadius: 50,
        zIndex: 3
    },
    thumbline: {
        width: 10,
        height: 25,
        backgroundColor: "grey",
        alignSelf: "center",
        marginVertical: 0,
        borderRadius: 3
    }
}) 

function closest(num: number, arr: [number, number, number]) {
    "worklet"
    return arr.reduce((prev, curr) => Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
}