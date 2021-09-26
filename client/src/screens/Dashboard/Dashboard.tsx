import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import privateRoute from '../../components/hoc/authentication';
import { GlobalContext } from '../../context';
import { AUTH_TYPES } from '../../context/types';
import { StorageService } from '../../services/storage/storage.service';

const DashBoard: FC = (): JSX.Element => {
  const context: any = useContext(GlobalContext);

  const logOut = async () => {
    await StorageService.removeItem('ACCESS_TOKEN');
    context.authDispatch({
      type: AUTH_TYPES.SET_USER,
      payload: { user: null, auth: false },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>DashBoard</Text>
        <Text>{context?.authState?.user?.NIC}</Text>
        <TouchableOpacity onPress={logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default privateRoute(DashBoard);
