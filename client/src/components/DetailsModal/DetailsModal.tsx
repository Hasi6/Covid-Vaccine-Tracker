import React, { FC, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { HStack, Modal, VStack, Text } from 'native-base';
import moment from 'moment';
import { storage } from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import { GlobalContext } from '../../context';
import { ALERT_TYPES } from '../../context/types';
import { CommonService } from '../../services/common/common.service';
interface IDetailsModalProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  title: string;
  details: any;
}

const DetailsModal: FC<IDetailsModalProps> = ({
  setShowModal,
  showModal,
  title,
  details,
}): JSX.Element => {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const context: any = useContext(GlobalContext);

  useEffect(() => {
    getImage();
  }, [title]);

  const getImage = async () => {
    if (title) {
      try {
        await storage()
          .ref(`vaccine_images`)
          .child(`${title}`)
          .getDownloadURL()
          .then(async (url) => {
            console.log(url);
            setImage(url);
          });
      } catch (err) {}
    }
  };

  const confirmUser = async () => {
    try {
      setLoading(true);
      const res = await CommonService.updateVaccination(title, !details?.vaccinateConfirm);
      setShowModal(false);
      setLoading(false);
      context.alertDispatch({
        type: ALERT_TYPES.SET_ALERT,
        payload: {
          alert: {
            status: 'success',
            title: 'Details Updated Successfully',
          },
        },
      });
    } catch (err) {
      setLoading(false);
      context.alertDispatch({
        type: ALERT_TYPES.SET_ALERT,
        payload: {
          alert: {
            status: 'error',
            title: 'Someting went wrong, Please try again',
          },
        },
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <HStack alignItems='center' justifyContent='space-between'>
              <Text fontWeight='medium'>Vaccine</Text>
              <Text color='blueGray.400'>{details?.vaccine?.title}</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='space-between'>
              <Text fontWeight='medium'>District</Text>
              <Text color='blueGray.400'>{details?.district?.En}</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='space-between'>
              <Text fontWeight='medium'>Dose</Text>
              <Text color='green.500'>{details?.dose}</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='space-between'>
              <Text fontWeight='medium'>Record Created</Text>
              <Text color='blueGray.400'>{moment(details?.createdAt).format('DD/MM/YYYY')}</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='space-between'>
              <Text fontWeight='medium'>Last Updated</Text>
              <Text color='blueGray.400'>{moment(details?.updatedAt).format('DD/MM/YYYY')}</Text>
            </HStack>
            <HStack alignItems='center' justifyContent='space-between'>
              {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
            </HStack>
          </VStack>
        </Modal.Body>
        <Text
          style={tailwind('text-center bg-blue-800 py-2 my-2 rounded-full')}
          onPress={confirmUser}
        >
          {details?.vaccinateConfirm ? (
            <Text style={tailwind(`text-center text-white`)}>
              {' '}
              {loading ? (
                <ActivityIndicator color='white' />
              ) : (
                <Text style={tailwind(`text-center text-white`)}>Unconfirm</Text>
              )}{' '}
            </Text>
          ) : (
            <Text style={tailwind(`text-center text-white`)}>
              {' '}
              {loading ? (
                <ActivityIndicator color='white' />
              ) : (
                <Text style={tailwind(`text-center text-white`)}>Confirm</Text>
              )}{' '}
            </Text>
          )}
        </Text>
      </Modal.Content>
    </Modal>
  );
};

export default DetailsModal;

const styles = StyleSheet.create({});
