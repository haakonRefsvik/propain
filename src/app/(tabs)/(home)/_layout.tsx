import { StackScreenWithSearchBar } from "@/constants/layout"
import {defaultStyles} from "@/styles"
import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const HomeScreenLayout = () => {

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index"
                    options={{
                        ...StackScreenWithSearchBar,
                    }}
                /> 
            </Stack>
        </GestureHandlerRootView>
    );
};

export default HomeScreenLayout