import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Input, Stack, Center, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../../context';
import privateRoute from '../../components/hoc/authentication';
import ModalDropDown from '../../components/ModalDropDown/ModalDropDown';
import { CommonService } from '../../services/common/common.service';

const UpdateDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  const context: any = useContext(GlobalContext);

  const [district, setDistrict] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [dose, setDose] = useState([
    { id: 1, En: 'One' },
    { id: 2, En: 'Two' },
  ]);

  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const [selectedDose, setSelectedDose] = useState(0);

  const [modalTitle, setModalTitle] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const onSelectFromDropDown = (value: number) => {
    switch (modalTitle) {
      case 'Select District': {
        setSelectedDistrict(value);
        break;
      }
      case 'Select Vaccine Type': {
        setSelectedVaccine(value);
        break;
      }
      case 'Select Dose': {
        setSelectedDose(value);
        break;
      }
    }
  };

  const generateList = (): any => {
    switch (modalTitle) {
      case 'Select District': {
        return district;
      }
      case 'Select Vaccine Type': {
        return vaccine;
      }
      case 'Select Dose': {
        return dose;
      }
    }
  };

  const getAllDistricts = async () => {
    const data = await CommonService.getAllDistricts();
    setDistrict(data);
  };

  const getAllVaccines = async () => {
    const data = await CommonService.getAllVaccines();
    setVaccine(data);
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

  useEffect(() => {
    getAllDistricts();
    getAllVaccines();
  }, []);

  return (
    <Center flex={1} px='3'>
      <ModalDropDown
        onChange={onSelectFromDropDown}
        showModal={isOpen}
        setShowModal={setIsOpen}
        list={generateList()}
        title={modalTitle}
      />

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
            {selectedDistrict
              ? //   @ts-ignore
                district?.filter((da: any) => da?.id === selectedDistrict)[0]?.En
              : 'Select District'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onVaccineTypeClicked}
          style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}
        >
          <Text style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}>
            {selectedVaccine
              ? //   @ts-ignore
                vaccine?.filter((da: any) => da?.id === selectedVaccine)[0]?.title
              : 'Select Vaccine Type'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDoseClicked}
          style={[tailwind(`bg-gray-100 rounded-lg`), styles.inputFieldsContainer]}
        >
          <Text style={[tailwind(`px-5 py-3 text-lg`), styles.inputFields]}>
            {selectedDose
              ? //   @ts-ignore
                dose?.filter((da: any) => da?.id === selectedDose)[0]?.En
              : 'Select Dose'}
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
