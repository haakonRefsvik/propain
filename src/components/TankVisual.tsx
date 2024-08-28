import {Dimensions, StyleSheet, Text, View} from "react-native"
import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react"
import Spacer from "./Spacer";
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { colors, fontSize, opacity } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import Svg, { Path, SvgProps } from 'react-native-svg';
import MaskedView from "@react-native-masked-view/masked-view";

type TankProps = {
    children: React.ReactNode
    Icon: React.FC<SvgProps & { color?: string }>;
}

export const maxHeight = 300
export const tankWidth = 170

export type TankRefProps = {
    fillTo: (percent: number) => void;

}
const TankVisual = React.forwardRef<TankRefProps, TankProps> (
    ({children, Icon}, ref, ) => {

        const height = useSharedValue(0);

        const fillTo = useCallback((percent: number) => {
            "worklet";

            height.value = withSpring(maxHeight * (percent / 100), {damping: 50} );
        }, [])

        useImperativeHandle(ref, () => 
        ({fillTo}), 
        [fillTo]);

        const animatedStyle = useAnimatedStyle(() => {
            return {
                height: height.value,
                transform: [{ translateY: maxHeight - height.value }]
            };
        });

        return (
            <View>
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                    paddingHorizontal: 10
                }}>
                    {children}
                </View>
                    <MaskedView
                        style={{ height: maxHeight, width: tankWidth, }}
                        maskElement={ 
                        <View style={{ flex: 1, backgroundColor: "transparent"}}>
                            <Icon height="100%" width="100%" color={"red"}/>
                        </View>}
                    >
                        <View                 
                            style = {{
                                backgroundColor: colors.container,
                                width : tankWidth,
                                height: maxHeight,
                                borderRadius: 25,
                                overflow: "hidden",
                            }}>
                            <Animated.View 
                                style = {[{
                                    width : tankWidth,
                                    height: height,
                                    backgroundColor: colors.primary,
                                    borderRadius: 0,
                                    opacity: 0.9,
                                }, animatedStyle]}>
                            </Animated.View>
                        </View>                    
                    </MaskedView>
            </View>
    )
})

export default TankVisual
