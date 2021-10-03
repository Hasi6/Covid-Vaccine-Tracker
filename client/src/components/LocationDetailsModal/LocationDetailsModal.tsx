import React, { FC, useContext, useState } from 'react';
import { HStack, Modal, VStack, Text, Button, Select, CheckIcon, Input } from 'native-base';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { DatePicker } from 'react-native-woodpicker';
import { GlobalContext } from '../../context';
import { ALERT_TYPES } from '../../context/types';
import { CommonService } from '../../services/common/common.service';
interface ILocationDetailsModalProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  districts: any[];
}

const LocationDetailsModal: FC<ILocationDetailsModalProps> = ({
  showModal,
  setShowModal,
  districts,
}): JSX.Element => {
  const context: any = useContext(GlobalContext);

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const handleText = (): string => (fromDate ? fromDate.toDateString() : 'No Date Selected');
  const handleText2 = (): string => (toDate ? toDate.toDateString() : 'No Date Selected');

  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  const [selectedDistrict, setSelectedDistrict]: any = useState(null);

  const handleFromDate = (e: any) => {
    setFromDate(e);
  };

  const timeValue = [
    '00:00 AM',
    '01:00 AM',
    '02:00 AM',
    '03:00 AM',
    '04:00 AM',
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '13:00 PM',
    '14:00 PM',
    '15:00 PM',
    '16:00 PM',
    '17:00 PM',
    '18:00 PM',
    '19:00 PM',
    '20:00 PM',
    '21:00 PM',
    '22:00 PM',
    '23:00 PM',
  ];

  const handleToDate = (e: any) => {
    setToDate(e);
  };

  const addLocation = async () => {
    try {
      context.alertDispatch({
        type: ALERT_TYPES.REMOVE_ALERT,
      });
      setLoading(true);
      await CommonService.addVaccineLocation({
        En: location,
        districtId: selectedDistrict?.id,
        fromDate,
        toDate,
        fromTime,
        toTime,
      });
      alert('Operation Success');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Something Went Wrong, Please Try Again');
    }
  };

  return (
    <View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='lg'>
        <Modal.Content maxWidth='350'>
          <Modal.CloseButton />
          <Modal.Header>Add Vaccinate Location</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>District</Text>
                <Select
                  minWidth='200'
                  accessibilityLabel={selectedDistrict ? selectedDistrict.En : 'Select District'}
                  placeholder={selectedDistrict ? selectedDistrict.En : 'Select District'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                >
                  {districts?.map((district: any, index) => (
                    <Select.Item key={index} label={district?.En} value={district} />
                  ))}
                </Select>
              </HStack>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>Location</Text>
                <Input
                  onChangeText={(e) => setLocation(e)}
                  placeholder='Location'
                  w={{
                    base: '68%',
                  }}
                />
              </HStack>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>From Date</Text>
                <DatePicker
                  style={tailwind(`mt-0 h-10`)}
                  value={fromDate}
                  onDateChange={handleFromDate}
                  title='From Date'
                  text={handleText()}
                  isNullable
                  iosDisplay='inline'
                />
              </HStack>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>To Date</Text>
                <DatePicker
                  style={tailwind(`mt-0 h-10`)}
                  value={toDate}
                  onDateChange={handleToDate}
                  title='To Picker'
                  text={handleText2()}
                  isNullable
                  iosDisplay='inline'
                />
              </HStack>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>From Time</Text>
                <Select
                  minWidth='200'
                  accessibilityLabel={fromTime ? fromTime : 'Select From Time'}
                  placeholder={fromTime ? fromTime : 'Select From Time'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setFromTime(itemValue)}
                >
                  {timeValue?.map((time: any, index) => (
                    <Select.Item key={index} label={time} value={time} />
                  ))}
                </Select>
              </HStack>
              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight='medium'>To Time</Text>
                <Select
                  selectedValue={'service'}
                  minWidth='200'
                  accessibilityLabel={toTime ? toTime : 'Select To Time'}
                  placeholder={toTime ? toTime : 'Select To Time'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setToTime(itemValue)}
                >
                  {timeValue?.map((time: any, index) => (
                    <Select.Item key={index} label={time} value={time} />
                  ))}
                </Select>
              </HStack>
            </VStack>
          </Modal.Body>
          <Button
            color='darkblue'
            onPress={addLocation}
            style={tailwind(`bg-blue-800 rounded-full mx-3 mb-3`)}
          >
            {loading ? <ActivityIndicator color='white' /> : 'Submit'}
          </Button>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default LocationDetailsModal;

const styles = StyleSheet.create({});
