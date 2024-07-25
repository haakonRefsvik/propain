import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
    size: number;
    horizontal?: boolean;
}

const Spacer: React.FC<SpacerProps> = ({ size, horizontal = false }) => {
    const spacerStyle: ViewStyle = {
        width: horizontal ? size : 0,
        height: horizontal ? 0 : size,
    };

    return <View style={spacerStyle} />;
};

export default Spacer;