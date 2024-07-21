import { colors, fontSize } from "@/constants/tokens"
import { Tabs } from "expo-router"
import { BlurView } from "expo-blur"
import { StyleSheet } from "react-native"
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons"
import React from "react"

const TabsNavigation = () => {
    return(
    <Tabs
        screenOptions = {{
            tabBarActiveTintColor: colors.primary, 
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                fontWeight: '500',
            },
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8,
            },
            tabBarBackground: () => (
                <BlurView
                    intensity={95}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        overflow: 'hidden',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                />
            ),
        }}
        >
        <Tabs.Screen 
            name = "(home)"
            options={{title: "Home",
            
            tabBarIcon: ({color}) => <MaterialCommunityIcons 
                name = "propane-tank"
                size = {20}
                color = {color}    
            />
        }}
        />

        <Tabs.Screen name = "settings"
           options={{title: "Settings",
           tabBarIcon: ({color}) => <FontAwesome 
               name = "gear"
               size = {20}
               color = {color}    
           />
       }}
        />
    </Tabs>
    )
}

export default TabsNavigation