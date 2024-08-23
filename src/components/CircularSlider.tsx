import {Dimensions, StyleSheet, Text, View} from "react-native"
import React, { useCallback, useEffect, useImperativeHandle, useState } from "react"
import Spacer from "./Spacer";
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { colors, fontSize, opacity } from "@/constants/tokens";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/styles";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { KnobOption, getClosestOption } from "@/utils/Setting";
import closestDegreeWorklet from "@/utils/GetClosestDegree";

interface CircularSliderProps {
    knobPosition: number;
    onPositionChange: (degree: number) => void;
}

const CircularSlider = (props: CircularSliderProps) => {
    const { knobPosition, onPositionChange } = props;
    const knobRotation = useSharedValue(knobPosition)
    const context = useSharedValue({y: 0})
    const lowDeg = KnobOption.Low.degree
    const medDeg = KnobOption.Medium.degree
    const highDeg = KnobOption.High.degree

    const closestSetting = useDerivedValue(() => {
        const newSetting = closestDegreeWorklet(knobRotation.value % 360, [lowDeg, medDeg, highDeg]);
        return newSetting;
    }, [knobRotation]);
    
    const turnTo = useCallback((destination: number) => {
        "worklet";
        runOnJS(onPositionChange)(destination);     // make parent know the current position of the knob
        knobRotation.value = withSpring(destination, {damping: 70, stiffness: 700})
    }, [])

    const gesture = Gesture.Pan()
    .onStart(() =>{
        context.value = { y: knobRotation.value }
    })
    .onUpdate(({ translationY }) => {
        knobRotation.value = (translationY % 360 )+ context.value.y
    })
    .onEnd(() => {
        turnTo(closestSetting.value)
    })
    
    const AnimationStyle = useAnimatedStyle (() => {
        return {
            transform: [{rotateZ: `${knobRotation.value}deg` }]
        } 
    });
    
    const idleTextColor = "grey"
    const chosenTextColor = colors.primary
    
    const lowTextStyle = useAnimatedStyle(() => {
        return {
            color: closestSetting.value === lowDeg ? chosenTextColor : idleTextColor,
            ...styles.lowtext
        };
    });
    
    const medTextStyle = useAnimatedStyle(() => {
        return {
            color: closestSetting.value === medDeg ? chosenTextColor : idleTextColor,
            ...styles.medtext
        };
    });
    
    const highTextStyle = useAnimatedStyle(() => {
        return {
            color: closestSetting.value === highDeg ? chosenTextColor : idleTextColor,
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
                <Spacer size={50}></Spacer>
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
