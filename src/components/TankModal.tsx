import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal as CustomModal} from 'react-native';
import { colors, fontSize } from '@/constants/tokens';
import Spacer from './Spacer';
import Tank from '@/constants/Tank';

interface TankNameModalProps {
    existingTanks: Tank[],
    visible: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

const TankNameModal: React.FC<TankNameModalProps> = ({ existingTanks, visible, onClose, onSave }) => {
    const [tankName, setTankName] = useState('');
    const [validName, setNameValid] = useState(true);

    const handleSelect = useCallback((tankName: string) => {
        onSave(tankName)
        setTankName('')
    }, [onSave]);

    useEffect(() => {
        if(existingTanks.find(tank => tank.name.toLowerCase() == tankName.trim().toLowerCase())){
            setNameValid(false)
            return
        }
        setNameValid(true)
    }, [tankName])

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
                    <View style = {styles.invalidNameContainer}>
                        {!validName && <Text style = {styles.invalidNameText}>Du har allerede en tank med dette navnet</Text>}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button color = {colors.maximumTrackTintColor} title="Avbryt" onPress={onClose} />
                        <Button 
                            color = {colors.primary} 
                            title="Lagre" 
                            onPress={() => handleSelect(tankName)} 
                            disabled = {!validName}
                        />
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
    invalidNameContainer: {
        width: "100%",
        height: 20
    },
    invalidNameText: {
        bottom: 10,
        fontSize: fontSize.xs,
        color: colors.errorColor,
        alignSelf: "flex-start",
        paddingHorizontal: 5
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
        borderRadius: 10,
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