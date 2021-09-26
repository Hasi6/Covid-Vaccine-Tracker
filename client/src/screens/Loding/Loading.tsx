import { useNavigation } from '@react-navigation/core';
import React, { FC, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../context';
import { AuthService } from '../../services/auth/auth.service';

const Loading: FC = (): JSX.Element => {
  const context: any = useContext(GlobalContext);
  console.log(context);
  const navigate = useNavigation();

  useEffect(() => {
    checkAuthState();
  }, [context?.authState]);

  const checkAuthState = async () => {
    if (context?.authState?.auth === null) {
      try {
        await AuthService.whoIAMI();
        navigate.navigate('Dashboard');
      } catch (err) {
        navigate.navigate('Login');
        return;
      }
    }
    if (context?.authState?.auth === false) {
      navigate.navigate('Login');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator color='blue' />
      </Text>
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
