import { FlatList, View, StyleSheet, Text} from "react-native";
import { TankCard, TankCardProps } from "./TankCard";
import Spacer from "./Spacer";
import { TankIcon12L } from "@/assets/TankSVG";
import { CustomTankCard } from "./CustomTankCard";



interface TankListProps {
    tanks: TankCardProps[];
    onTankPress: (tank: TankCardProps) => void
}

const TankList: React.FC<TankListProps> = ({ tanks, onTankPress}) => {
    const renderItem = ({ item }: { item: TankCardProps }) => {
        if(item.svgColor === "CUSTOM_TANK"){
            return(
            <CustomTankCard
                emptyWeight={0.0}
                liters={0.0}
                Icon={TankIcon12L}

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