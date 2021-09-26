import React, { FC } from 'react';
import tailwind from 'tailwind-rn';
import { View, Text } from 'react-native';

const Login: FC = (): JSX.Element => {
  return (
    <View>
      <View style={[tailwind(`bg-blue-800 `), { height: 500 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hasi</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
