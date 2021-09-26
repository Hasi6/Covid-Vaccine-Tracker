import React, { FC, useContext, useState } from 'react';
import tailwind from 'tailwind-rn';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthService } from '../../services/auth/auth.service';
import { useNavigation } from '@react-navigation/core';
import { GlobalContext } from '../../context';
import { AUTH_TYPES } from '../../context/types';

const Login: FC = (): JSX.Element => {
  const navigate = useNavigation();
  const context: any = useContext(GlobalContext);

  const [NIC, setNIC] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setError(null);
      setLoading(true);
      await AuthService.login({
        NIC: NIC ? NIC : undefined,
        password: password ? password : undefined,
      });

      setLoading(false);
      context?.authDispatch({
        type: AUTH_TYPES.SET_USER,
        payload: {
          auth: null,
          user: null,
        },
      });
      navigate.navigate('Loading');
    } catch (err) {
      setLoading(false);
      setError('Inavlid Password');
    }
  };

  return (
    <View>
      <View style={[tailwind(`bg-blue-900 relative`), styles.mainContainer]}>
        <Image
          width={70}
          height={70}
          style={[styles.covidImage, tailwind(`absolute bottom-40`)]}
          source={{
            uri: 'https://setshabaresearchcentre.org.za/wp-content/uploads/2021/04/200617_Oxford-Vaccine-Trial-South-African-Logo_v6_no-text-01.png',
          }}
        />
        <View style={[tailwind(`bg-white rounded-lg absolute -bottom-20`), styles.loginCard]}>
          <View style={styles.inputs}>
            <TextInput
              value={NIC}
              onChangeText={(e) => setNIC(e)}
              style={tailwind(`bg-white w-64 rounded-lg py-2 px-4 border-2 my-3 border-gray-400`)}
              placeholder='ID Number'
            />
            <TextInput
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={tailwind(`bg-white w-64 rounded-lg py-2 px-4 border-2 my-3 border-gray-400`)}
              placeholder='Password'
              secureTextEntry={true}
            />
            {error && <Text style={tailwind(`text-right text-red-800 w-64`)}>{error}</Text>}
            <TouchableOpacity onPress={loginUser}>
              <Text
                style={tailwind(
                  `bg-blue-900 w-64 text-center py-2 rounded-full font-bold text-white mt-6`
                )}
              >
                {loading ? <ActivityIndicator color={'white'} /> : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.maskImageView}>
        <Image
          width={70}
          height={70}
          style={[styles.maskImage, tailwind(`mt-24 rounded-md`)]}
          source={{
            uri: 'https://i2.wp.com/www.norrag.org/app/uploads/2021/01/NORRAG_Highlights44.png?fit=1923%2C1065&ssl=1',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  loginCard: {
    width: '80%',
    height: 300,
    alignItems: 'center',
  },
  covidImage: {
    width: 150,
    height: 150,
    zIndex: 101,
  },
  maskImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskImage: {
    width: 200,
    height: 120,
    zIndex: 101,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Login;
