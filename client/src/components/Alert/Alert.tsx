import React, { useContext } from 'react';
import { Stack, Alert, IconButton, HStack, VStack, CloseIcon, Text, Center } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { GlobalContext } from '../../context';
import tailwind from 'tailwind-rn';
import { ALERT_TYPES } from '../../context/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AlertComponent = () => {
  const context: any = useContext(GlobalContext);
  const alert = context?.alertState?.alert;

  const removeAlert = () => {
    context.alertDispatch({
      type: ALERT_TYPES.REMOVE_ALERT,
    });
  };

  return (
    <Stack space={3} w='100%' style={tailwind(`relative top-64 z-50`)}>
      {alert ? (
        <Alert w='100%' status={alert?.status}>
          <VStack space={2} flexShrink={1} w='100%'>
            <HStack flexShrink={1} space={2} justifyContent='space-between'>
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt='1' />
                <Text fontSize='md' color='coolGray.800'>
                  {alert?.title}
                </Text>
              </HStack>
              <TouchableOpacity onPress={removeAlert}>
                <IconButton variant='unstyled' icon={<CloseIcon size='3' color='coolGray.600' />} />
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Alert>
      ) : (
        <View></View>
      )}
    </Stack>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({});
