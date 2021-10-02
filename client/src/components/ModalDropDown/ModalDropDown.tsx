import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, VStack, HStack, Text, Radio, Center, NativeBaseProvider } from 'native-base';
import { FC } from 'react-native-table-component/node_modules/@types/react';

interface IModalDropDownProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  title: string;
  list: any[];
  onChange?: (data: string) => void;
}

const ModalDropDown: FC<IModalDropDownProps> = ({
  showModal,
  setShowModal,
  title,
}): JSX.Element => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <Center>
            <VStack space={3}>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>Sub Total</Text>
              </HStack>
            </VStack>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDropDown;

const styles = StyleSheet.create({});
