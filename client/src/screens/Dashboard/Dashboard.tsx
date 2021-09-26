import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashBoard: FC = (): JSX.Element => {
  return (
    <View style={styles.mainContainer}>
      <Text>DashBoard</Text>
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

export default DashBoard;
