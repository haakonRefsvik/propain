import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal as CustomModal} from 'react-native';
import { colors, fontSize } from '@/constants/tokens';
import Spacer from './Spacer';

interface TankNameModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

const TankNameModal: React.FC<TankNameModalProps> = ({ visible, onClose, onSave }) => {
    const [tankName, setTankName] = useState('');

    const handleSelect = useCallback((tankName: string) => {
        onSave(tankName)
        setTankName('')
    }, []);

    return (
        <CustomModal 
        visible ={visible}
        transparent
        animationType='fade'
        statusBarTranslucent
        >
            <View style = {styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Gi tanken et navn</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Hus, hytte..."
                        value={tankName}
                        onChangeText={setTankName}
                    />
                    <View style={styles.buttonContainer}>
                        <Button color = {colors.maximumTrackTintColor} title="Avbryt" onPress={onClose} />
                        <Button color = {colors.primary} title="Lagre" onPress={() => handleSelect(tankName)} />
                    </View>
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.container,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center"
    },
    modalTitle: {
        fontSize: fontSize.lg,
        color: colors.text,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        color: colors.text,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default TankNameModal;