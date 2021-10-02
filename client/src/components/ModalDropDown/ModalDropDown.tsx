import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modal } from 'native-base';
import { FC } from 'react-native-table-component/node_modules/@types/react';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';

interface IModalDropDownProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  title: string;
  list: any[];
  onChange: (data: number) => void;
}

const ModalDropDown: FC<IModalDropDownProps> = ({
  showModal,
  setShowModal,
  title,
  list,
  onChange,
}): JSX.Element => {
  const onSelectItem = (id: number) => {
    onChange(id);
    setShowModal(false);
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <View style={tailwind(`text-center`)}>
          {list?.map((da, index) => (
            <TouchableHighlight key={index} onPress={() => onSelectItem(da?.id)}>
              <Text
                onPress={() => onSelectItem(da?.id)}
                style={[tailwind(`text-center`), styles.districtName]}
              >
                {da?.En}
              </Text>
            </TouchableHighlight>
          ))}
        </View>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDropDown;

const styles = StyleSheet.create({
  districtName: {
    fontFamily: 'Poppins_600SemiBold',
  },
});
