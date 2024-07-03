import { colors, fontSize } from "@/constants/tokens"
import { StyleSheet } from "react-native"

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.text
    },
    dropdowncontainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50,
        paddingVertical: 10,
        zIndex: 2
    },
    inputfieldcontainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50,
        paddingVertical: 10,
        zIndex: 1
    },
    input: {
        height: 40,
        width: 100,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        fontWeight: "bold",
        color: colors.text
    },
    inputStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colors.background,
    },
    button: {
        marginRight: 5,
        marginBottom: 10,
        paddingVertical: 55,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: colors.primary,
        fontSize: 0,
    },
})

export const utilStyles = StyleSheet.create({})