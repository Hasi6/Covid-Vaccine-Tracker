import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import privateRoute from '../../components/hoc/authentication';
import { GlobalContext } from '../../context';
import { AUTH_TYPES, PROFILE_TYPES } from '../../context/types';
import { CommonService } from '../../services/common/common.service';
import { StorageService } from '../../services/storage/storage.service';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import LocationTable from '../../components/LocationTable/LocationTable';
import moment from 'moment';
const DashBoard: FC = (): JSX.Element => {
  const context: any = useContext(GlobalContext);

  const navigation = useNavigation();

  const logOut = async () => {
    await StorageService.removeItem('ACCESS_TOKEN');
    context.authDispatch({
      type: AUTH_TYPES.SET_USER,
      payload: { user: null, auth: false },
    });
  };

  const [covidData, setCovidData] = useState({
    localDeaths: null,
    globalDeaths: null,
    localCases: null,
    globalCases: null,
  });

  const [vaccinateLocations, setVaccinateLocations] = useState([]);

  const getCovidDetails = async () => {
    try {
      const data = await CommonService.getCovidDetails();
      if (data) {
        setCovidData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getProfileData = async () => {
    try {
      const data = await CommonService.getPreviousDetails();
      context.profileDispatch({
        type: PROFILE_TYPES.SET_PROFILE,
        payload: { profile: data },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getAllLocations = async () => {
    try {
      const res = await CommonService.getVaccinateLocations();
      let allData: any = [];
      res?.forEach((da: any) => {
        let data = [
          da?.district?.province?.En,
          da?.district?.En,
          da.En,
          moment(da?.toDate).format('DD/MM/YYYY'),
          `${da?.fromTime} -- ${da?.toTime}`,
        ];
        allData = [...allData, data];
      });

      setVaccinateLocations(allData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCovidDetails();
    getProfileData();
    getAllLocations();
  }, []);

  const updateDetails = () => {
    navigation.navigate('UpdateDetails');
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <View
          style={[
            tailwind(`mt-10 py-2 px-4 bg-gray-100  w-5/6 rounded-2xl`),
            styles.greetingContainer,
          ]}
        >
          <Text style={[tailwind(`font-semibold text-left`), styles.greetingText]}>
            {CommonService.getGreeting()}
          </Text>
          <Text style={[tailwind(`font-semibold text-left text-red-600`), styles.infoText]}>
            {context?.profileState?.profile?.dose ? (
              <Text style={[tailwind(`font-semibold text-left text-blue-600`), styles.infoText]}>
                You have Vaccinated. Stay Safe
              </Text>
            ) : (
              'You haven’t get the vaccine yet. Please find the nearest location below and get the vaccine'
            )}
          </Text>
        </View>
        <TouchableOpacity onPress={logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <View
          style={[
            tailwind(`mt-2 py-2 px-4 bg-gray-100  w-5/6 rounded-2xl`),
            styles.greetingContainer,
          ]}
        >
          <TouchableOpacity style={[tailwind(`flex flex-row relative`)]} onPress={updateDetails}>
            <Text style={[tailwind(`font-semibold text-left text-blue-600`), styles.greetingText]}>
              Upload your vaccinae Details
            </Text>
            <Ionicons
              name='add-circle-outline'
              style={tailwind(`text-xl right-14 bottom-0 absolute`)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[tailwind(`mt-5`)]}>
        <Text style={[tailwind(`mb-2 mx-6`), styles.countryText]}>Sri Lanka</Text>
        <View style={tailwind(`flex flex-row`)}>
          <DetailsCard
            image='https://cdn2.iconfinder.com/data/icons/coronavirus-15/1024/death-512.png'
            total={covidData.localDeaths}
          />
          <DetailsCard
            image='https://www.hopkinsmedicine.org/-/media/project/jhm/icons/coronavirus/fever.ashx?h=262&iar=0&w=265&hash=DE292BE570155A0B09848914125E55FF'
            total={covidData.localCases}
          />
        </View>
      </View>

      <View style={[tailwind(`mt-5`)]}>
        <Text style={[tailwind(`mb-2 mx-6`), styles.countryText]}>World Wide</Text>
        <View style={tailwind(`flex flex-row`)}>
          <DetailsCard
            image='https://cdn2.iconfinder.com/data/icons/coronavirus-15/1024/death-512.png'
            total={covidData.globalDeaths}
          />
          <DetailsCard
            image='https://www.hopkinsmedicine.org/-/media/project/jhm/icons/coronavirus/fever.ashx?h=262&iar=0&w=265&hash=DE292BE570155A0B09848914125E55FF'
            total={covidData.globalCases}
          />
        </View>
      </View>
      <View style={[tailwind(`mt-5`)]}>
        <Text style={[tailwind(`mb-2 mx-6`), styles.countryText]}>Vaccinate Locations</Text>
        <LocationTable locations={vaccinateLocations} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  greetingContainer: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  countryText: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
  },
  greetingText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
});

export default privateRoute(DashBoard);
