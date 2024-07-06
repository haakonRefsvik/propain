import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal as CustomModal} from 'react-native';
import { colors, fontSize } from '@/constants/tokens';

interface TankNameModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

const TankNameModal: React.FC<TankNameModalProps> = ({ visible, onClose, onSave }) => {
    const [tankName, setTankName] = useState('');

    return (
        <CustomModal visible ={visible}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Name Your Tank</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter tank name"
                    value={tankName}
                    onChangeText={setTankName}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={() => onSave(tankName)} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: fontSize.lg,
        color: colors.text,
        marginBottom: 20,
    },
    input: {
        width: '100%',
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