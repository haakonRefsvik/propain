import React from 'react';
import { TankCardProps } from './TankCard';
import Svg, { Path, SvgProps } from 'react-native-svg';

class Tank implements TankCardProps {
    emptyWeight: number;
    liters: number;
    Icon: React.FC<SvgProps & { color?: string }>;
    svgColor?: string;
    name: string;

    constructor(
        name: string, 
        emptyWeight: number, 
        liters: number, 
        Icon: React.FC<SvgProps & { color?: string }>, 
        svgColor?: string
        ) {
        this.name = name;
        this.emptyWeight = emptyWeight;
        this.liters = liters;
        this.Icon = Icon;
        this.svgColor = svgColor;
    }
}

export default Tank;