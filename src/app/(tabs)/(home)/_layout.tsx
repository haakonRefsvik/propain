import { StackScreenWithSearchBar } from "@/constants/layout"
import { colors } from "@/constants/tokens"
import {defaultStyles} from "@/styles"
import { Stack } from "expo-router"
import React, { useCallback, useRef } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import SongsScreen from "."
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetRefProps, MAX_Y } from "./BottomSheet"


const SongScreenLayout = () => {
    const ref = useRef<BottomSheetRefProps>(null)
    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive()

        if(isActive){
            ref?.current?.scrollTo(0);
        }
        else{
            ref?.current?.scrollTo(MAX_Y);
        }
    }, [])

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <BottomSheet ref = {ref}></BottomSheet>
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
        </GestureHandlerRootView>
    );
};

export default SongScreenLayout