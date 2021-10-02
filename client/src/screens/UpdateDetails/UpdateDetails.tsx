import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Input, Stack, Center, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../../context';
import privateRoute from '../../components/hoc/authentication';
import ModalDropDown from '../../components/ModalDropDown/ModalDropDown';

const UpdateDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  const context: any = useContext(GlobalContext);

  const [district, setDistrict] = useState();
  const [vaccine, setVaccine] = useState();
  const [dose, setDose] = useState();

  const [modalTitle, setModalTitle] = useState('');
  const [list, setList] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };

  const onDistrictClicked = () => {
    setIsOpen(true);
    setModalTitle('Select District');
  };

  const onVaccineTypeClicked = () => {
    setIsOpen(true);
    setModalTitle('Select Vaccine Type');
  };
  const onDoseClicked = () => {
    setIsOpen(true);
    setModalTitle('Select Dose');
  };

  return (
    <Center flex={1} px='3'>
      <ModalDropDown showModal={isOpen} setShowModal={setIsOpen} list={list} title={modalTitle} />

      <Stack
        space={4}
        w={{
          base: '100%',
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name='arrow-back-circle-outline'
            style={tailwind(`text-4xl`)}
            onPress={goBack}
          />
        </TouchableOpacity>
        <Center>
          <Heading textAlign='center' mb='10'>
            Update Your Vaccinate Details
          </Heading>
        </Center>
        <View style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}>
          <Input
            style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}
            variant='unstyled'
            placeholder='ID Number'
            editable={false}
            value={context?.authState?.user?.NIC}
          />
        </View>
        <TouchableOpacity
          onPress={onDistrictClicked}
          style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}
        >
          <Text style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}>
            {context?.authState?.user?.NIC}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onVaccineTypeClicked}
          style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}
        >
          <Text style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}>
            {context?.authState?.user?.NIC}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDoseClicked}
          style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}
        >
          <Text style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}>
            {context?.authState?.user?.NIC}
          </Text>
        </TouchableOpacity>
      </Stack>
    </Center>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldsContainer: {
    fontFamily: 'Poppins_600SemiBold',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    zIndex: -1,
  },
  inputFields: {
    fontFamily: 'Poppins_600SemiBold',
  },
});
export default privateRoute(UpdateDetails);
