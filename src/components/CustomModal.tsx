import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, ModalProps, ViewStyle, StyleProp, TouchableOpacity} from 'react-native';
import { colors, fontSize } from '@/constants/tokens';
import Spacer from './Spacer';
import Tank from '@/constants/Tank';

interface CustomModalProps extends ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
  }


  const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onClose,
    children,
    containerStyle,
    ...modalProps
  }) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
        {...modalProps}
      >
        <View style={styles.overlay}>
          <View style={[styles.modalContent, containerStyle]}>
              {children}
            <Button 
                title='Ok'
                color = {colors.primary}  
                onPress={() => onClose()} >
            </Button>
          </View>
        </View>
      </Modal>
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

export default CustomModal;