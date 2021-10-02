import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

interface IDetailsCardProps {
  image: string;
  total: number | null;
}

const DetailsCard: FC<IDetailsCardProps> = ({ image, total }): JSX.Element => {
  return (
    <View
      style={[
        tailwind(`flex flex-row bg-gray-100 w-2/5 mx-4 px-2 rounded-xl`),
        styles.mainContainer,
      ]}
    >
      <Image
        width={80}
        height={80}
        source={{
          uri: image,
        }}
        style={{ width: 80, height: 80 }}
      />
      <Text style={[tailwind(`ml-1`), styles.totalText]}>
        {total ? total : <ActivityIndicator color='blue' />}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  totalText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default DetailsCard;
