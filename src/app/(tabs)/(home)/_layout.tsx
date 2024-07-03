import { StackScreenWithSearchBar } from "@/constants/layout"
import { colors } from "@/constants/tokens"
import {defaultStyles} from "@/styles"
import { Stack } from "expo-router"
import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import SongsScreen from "."



const SongScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index"
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: 'Hjem',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => alert('Button pressed!')}
                                style={defaultStyles.button}
                            >
                                <Icon name="plus" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </View>
    );
};

export default SongScreenLayout