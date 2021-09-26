import { useNavigation } from '@react-navigation/core';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GlobalContext } from '../../../context';
import { AUTH_TYPES } from '../../../context/types';
import { AuthService } from '../../../services/auth/auth.service';
export default function privateRoute(ComposedComponent: any) {
  const Authentication: FC<any> = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigation();

    const context: any = useContext(GlobalContext);

    useEffect(() => {
      _checkAndRedirect();
    }, [context?.authState]);

    const _checkAndRedirect = async () => {
      if (context?.authState?.auth && context?.authState?.user) {
        setLoaded(true);
        setAuthenticated(true);
        return;
      }
      if (context?.authState?.auth === null) {
        try {
          const res = await AuthService.whoIAMI();
          navigate.navigate('Dashboard');
          setLoaded(true);
          setAuthenticated(true);
          context?.authDispatch({
            type: AUTH_TYPES.SET_USER,
            payload: {
              auth: true,
              user: res?.data?.data?.user,
            },
          });
        } catch (err) {
          navigate.navigate('Login');
          setLoaded(true);
          setAuthenticated(true);
          return;
        }
      }
      if (context?.authState?.auth === false) {
        setAuthenticated(false);
        navigate.navigate('Login');
      }
    };

    return (
      <>
        {!loaded && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {loaded && authenticated && <ComposedComponent {...props} />}
      </>
    );
  };

  return Authentication;
}
