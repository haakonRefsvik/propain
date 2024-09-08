import { FlatList, View, StyleSheet, Text} from "react-native";
import { TankCard, TankCardProps } from "./TankCard";
import Spacer from "./Spacer";
import { TankIcon12L, TankIcon18L } from "@/assets/TankSVG";
import { CustomTankCard } from "./CustomTankCard";
import { useState } from "react";
import Tank from "@/constants/Tank";

interface TankListProps {
    tanks: TankCardProps[];
    onTankPress: (tank: TankCardProps) => void
}

const TankList: React.FC<TankListProps> = ({ tanks, onTankPress}) => {
    const [liters, setLiters] = useState<string>("")
    const [emptyWeight, setEmptyWeight] = useState<string>("")
    
    const renderItem = ({ item }: { item: TankCardProps }) => {
        if(item.svgColor === "CUSTOM_TANK"){
            return(
            <CustomTankCard
                ew={emptyWeight}
                l={liters}
                onChangeLiters={setLiters}
                onChangeWeight={setEmptyWeight}
                onPress={() => {
                    onTankPress(new Tank(
                        "", 
                        parseFloat(emptyWeight), 
                        parseFloat(liters), 
                        TankIcon12L)
                    )
                }}
                ></CustomTankCard>
            )
        }

        return(
            <TankCard 
                {...item}
                onPress={() => onTankPress(item)}
            />)

    }

    const renderSeparator = () => <Spacer size={10}></Spacer>

    return ( 
        <View style={styles.container}>
            <Spacer size={40} />
            <FlatList
                data={tanks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                ItemSeparatorComponent={renderSeparator}
            />
            <Spacer size={40} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContent: {
        alignItems: "center",
        flexGrow: 1,
        paddingHorizontal: 0, // Adjust as needed
        paddingVertical: 0
    },
});

export default TankList;