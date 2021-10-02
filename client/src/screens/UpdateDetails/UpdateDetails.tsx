import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Platform, Button, Image, ActivityIndicator } from 'react-native';
import { Input, Stack, Center, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { GlobalContext } from '../../context';
import privateRoute from '../../components/hoc/authentication';
import ModalDropDown from '../../components/ModalDropDown/ModalDropDown';
import { CommonService } from '../../services/common/common.service';
import { storage } from '../../config/firebase';

const UpdateDetails = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  const context: any = useContext(GlobalContext);

  const [district, setDistrict] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [dose] = useState([
    { id: 1, En: 'One' },
    { id: 2, En: 'Two' },
  ]);

  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const [selectedDose, setSelectedDose] = useState(0);

  const [modalTitle, setModalTitle] = useState('');

  const [image, setImage] = useState<any>(null);

  const placeHolderImage =
    'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg';

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      await uploadImage(result);
    }
  };

  const uploadImage = async (image: any) => {
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filePath = `${context?.authState?.user?.NIC}`;
      const ref = storage().ref(`vaccine_images/${filePath}`);
      ref.put(blob).on(
        'state_changed',
        (snapshot) => {
          const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            await storage()
              .ref(`vaccine_images`)
              .child(filePath)
              .getDownloadURL()
              .then(async (url) => {
                console.log(url);
              });
          } catch (err: any) {
            setLoading(false);
            console.error(err.message);
            alert(err.message);
          }
        }
      );
    } catch (err) {
      console.log(err);
      alert(JSON.stringify(err));
    }
  };

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
      <View style={tailwind(`relative`)}>
        <Ionicons name='camera-outline' style={tailwind(`text-4xl `)} onPress={pickImage} />
        <Image
          source={{ uri: image ? image : placeHolderImage }}
          style={{ width: 300, height: 200 }}
        />
      </View>
      <TouchableOpacity>
        <Text style={[tailwind(`bg-blue-800 mt-4 py-4 px-40 rounded-full text-white`)]}>
          {loading ? <ActivityIndicator color='white' /> : 'Submit'}
        </Text>
      </TouchableOpacity>
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
