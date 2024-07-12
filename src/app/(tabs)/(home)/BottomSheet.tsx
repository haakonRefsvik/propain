import {Dimensions, StyleSheet, Text, View} from "react-native"
import React, { useCallback, useEffect, useImperativeHandle } from "react"
import { defaultStyles } from "@/styles"
import Spacer from "./Spacer";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { colors, fontSize } from "@/constants/tokens";
import { InputField } from "./InputField";
import { TankCard } from "./TankCard";
import { TankIcon12L, TankIcon18L, TankIcon24L, TankIcon26L, TankIcon27L, TankIcon33L} from './TankSVG';

import TankList from "./TankList";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");
export const MAX_Y = -SCREEN_HEIGHT + 150
type BottomSheetProps = {children: React.ReactNode}

export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps> (
    ({children}, ref, ) => {
    
    const active = useSharedValue(false)
    const translateY = useSharedValue(0)
    const isActive = useCallback(() => {
        return active.value;
    }, [])

    
    const context = useSharedValue({y: 0})
    const scrollTo = useCallback((destination: number) => {
        "worklet";

        active.value = destination !== 0
        translateY.value = withSpring(destination, {damping: 50})
    }, [])

    useImperativeHandle(ref, () => 
    ({scrollTo, isActive}), 
    [scrollTo, isActive]);

    const gesture = Gesture.Pan()
        .onStart(() =>{
            context.value = { y: translateY.value }
        })
        .onUpdate(({ translationY }) => {
            translateY.value = translationY + context.value.y
            translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
        })
        .onEnd(() => {
            if(translateY.value > -SCREEN_HEIGHT * 0.7) {
                scrollTo(0)
            }
            else if (translateY.value <- SCREEN_HEIGHT / 1.5){
                scrollTo(MAX_Y)
            } 
        })

    const BottomSheetStyle = useAnimatedStyle (() => {
        return {
            transform: [{translateY: translateY.value}]
        } 
    });

    return(
        <GestureDetector gesture={gesture}>
            <Animated.View style = {[styles.sheetcontainer, BottomSheetStyle]}>
                <View style = {styles.thumbline}/>
                <Spacer size={25}></Spacer>
                {children}
            </Animated.View>
        </GestureDetector>
    )
})

export default BottomSheet

const styles = StyleSheet.create({
    sheetcontainer: {
        flex: 1,
        backgroundColor: colors.container,
        height: SCREEN_HEIGHT,
        width: "100%",
        position: "absolute",
        paddingHorizontal: 20,
        alignSelf: "center",
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        zIndex: 3
    },
    thumbline: {
        width: 75,
        height: 4,
        backgroundColor: "grey",
        alignSelf: "center",
        marginVertical: 15,
        borderRadius: 2
    }
}) 