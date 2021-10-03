import { Center } from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import privateAdminRoute from '../../components/hoc/authorization';
import { GlobalContext } from '../../context';
import { AUTH_TYPES } from '../../context/types';
import { StorageService } from '../../services/storage/storage.service';

const AdminDashBoard = () => {
  const context: any = useContext(GlobalContext);
  const logOut = async () => {
    await StorageService.removeItem('ACCESS_TOKEN');
    context.authDispatch({
      type: AUTH_TYPES.SET_USER,
      payload: { user: null, auth: false },
    });
  };
  return (
    <View>
      <View style={[tailwind(`mt-10`), styles.mainContainer]}>
        <View style={[tailwind(``), styles.searchBox]}></View>
        <TouchableOpacity onPress={logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default privateAdminRoute(AdminDashBoard);

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  searchBox: {},
});
