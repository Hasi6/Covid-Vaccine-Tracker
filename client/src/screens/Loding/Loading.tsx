import { useNavigation } from '@react-navigation/core';
import React, { FC, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../context';
import { AUTH_TYPES } from '../../context/types';
import { AuthService } from '../../services/auth/auth.service';

const Loading: FC = (): JSX.Element => {
  const context: any = useContext(GlobalContext);
  const navigate = useNavigation();

  useEffect(() => {
    checkAuthState();
  }, [context?.authState]);

  const checkAuthState = async () => {
    if (context?.authState?.auth === null) {
      try {
        const res = await AuthService.whoIAMI();
        context?.authDispatch({
          type: AUTH_TYPES.SET_USER,
          payload: {
            auth: true,
            user: res?.data?.data?.user,
          },
        });
      } catch (err) {
        navigate.navigate('Login');
        return;
      }
    }
    if (context?.authState?.auth === false) {
      navigate.navigate('Login');
      return;
    }
    if (context?.authState?.user?.role === 'NORMAL') {
      navigate.navigate('Dashboard');
      return;
    }
    navigate.navigate('AdminDashBoard');
    return;
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator color='blue' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Loading;
