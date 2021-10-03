import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import DetailsModal from '../../components/DetailsModal/DetailsModal';
import privateAdminRoute from '../../components/hoc/authorization';
import LocationDetailsModal from '../../components/LocationDetailsModal/LocationDetailsModal';
import { GlobalContext } from '../../context';
import { ALERT_TYPES, AUTH_TYPES } from '../../context/types';
import { CommonService } from '../../services/common/common.service';
import { StorageService } from '../../services/storage/storage.service';

const AdminDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [nic, setNic] = useState('');

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getAllDistricts();
  }, []);

  const getAllDistricts = async () => {
    const data = await CommonService.getAllDistricts();
    setDistricts(data);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const context: any = useContext(GlobalContext);

  const [profileData, setProfileData] = useState<any>(null);

  const logOut = async () => {
    await StorageService.removeItem('ACCESS_TOKEN');
    context.authDispatch({
      type: AUTH_TYPES.SET_USER,
      payload: { user: null, auth: false },
    });
  };

  const findUserDetails = async () => {
    try {
      context.alertDispatch({
        type: ALERT_TYPES.REMOVE_ALERT,
      });
      setLoading(true);
      const res = await CommonService.findUserDetailsFromIDNumber(nic || 'null');
      setLoading(false);
      if (!res?.data) {
        context.alertDispatch({
          type: ALERT_TYPES.SET_ALERT,
          payload: {
            alert: {
              status: 'error',
              title: 'No User Found',
            },
          },
        });
        setProfileData(null);
        return;
      }

      if (res?.data?.profile) {
        setProfileData(res?.data?.profile);
      } else {
        setProfileData(false);
      }
    } catch (err) {
      setLoading(false);
      context.alertDispatch({
        type: ALERT_TYPES.SET_ALERT,
        payload: {
          alert: {
            status: 'error',
            title: 'Something went wrong, please try again',
          },
        },
      });
    }
  };

  const setShowModal = () => {
    setProfileData(null);
  };

  return (
    <View>
      <View style={[tailwind(`mt-20`), styles.mainContainer]}>
        <DetailsModal
          showModal={profileData}
          setShowModal={setShowModal}
          title={nic}
          details={profileData}
        />
        <LocationDetailsModal
          districts={districts}
          showModal={modalOpen}
          setShowModal={() => setModalOpen(false)}
        />
        <View style={[tailwind(`bg-gray-100 mx-5 rounded-xl`), styles.searchBox]}>
          <TextInput
            placeholder='ID Number'
            style={[tailwind(`px-4 py-2`), styles.input]}
            onChangeText={(e) => setNic(e)}
          />
        </View>
        <TouchableOpacity
          style={[tailwind(`bg-blue-800 mx-5 rounded-full mt-4`), styles.searchBox]}
          onPress={findUserDetails}
        >
          <Text style={[tailwind(`text-center py-2 text-white`), styles.input]}>
            {loading ? <ActivityIndicator color='white' /> : <Text>Search</Text>}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>

        {profileData === false ? (
          <Text>User Doesnot take any Vaccine Yet</Text>
        ) : (
          <View>
            <Text>{profileData?.id}</Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={[tailwind(`bg-gray-100 mx-5 rounded-xl flex flex-row`), styles.searchBox]}
        >
          <Text style={[tailwind(`px-4 py-2`), styles.input]}>Add Vaccine Location</Text>
          <Ionicons name='add-circle-outline' style={tailwind(`text-xl top-1`)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default privateAdminRoute(AdminDashBoard);

const styles = StyleSheet.create({
  mainContainer: {},
  searchBox: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    fontFamily: 'Poppins_600SemiBold',
  },
});
