import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";


export default function TankCard(){
    return(
        <View>
            <TouchableOpacity
                style = {styles.cardcontainer}
            >
            <Text style = {defaultStyles.text}> halla chief</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardcontainer: {
        height: 100,
        justifyContent: "space-between",
        backgroundColor: colors.sheetContainer,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 8,
    }
})
