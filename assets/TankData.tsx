import { colors } from "@/constants/tokens";
import { TankIcon12L, TankIcon18L, TankIcon24L, TankIcon26L, TankIcon27L, TankIcon33L } from "./TankSVG";

const tanksData = [
    { liters: -1.0, emptyWeight: -1.0, svgColor: "CUSTOM_TANK", Icon: TankIcon12L},    // placeholder for custom tank
    { liters: 12.5, emptyWeight: 3.4, svgColor: colors.primary, Icon: TankIcon12L},
    { liters: 18.2, emptyWeight: 4.1, svgColor: colors.primary, Icon: TankIcon18L},
    { liters: 24.5, emptyWeight: 5, svgColor: colors.primary, Icon: TankIcon24L},
    { liters: 26.2, emptyWeight: 5.1, svgColor: colors.primary, Icon: TankIcon26L},
    { liters: 27.4, emptyWeight: 5.3, svgColor: colors.primary, Icon: TankIcon27L},
    { liters: 33.5, emptyWeight: 7.5, svgColor: colors.primary, Icon: TankIcon33L},
];

export default tanksData