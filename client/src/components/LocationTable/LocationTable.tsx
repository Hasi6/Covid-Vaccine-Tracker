import React, { FC } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import tailwind from 'tailwind-rn';

interface ILocationTableProps {
  locations: any[];
}

const LocationTable: FC<ILocationTableProps> = ({ locations }): JSX.Element => {
  const tableHead = ['Province', 'District', 'To Date', 'Time'];

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper>
          <Rows data={locations} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
      </Table>
    </ScrollView>
  );
};

export default LocationTable;

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff', height: 400 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  row: { height: 48, borderBottomColor: 'red' },
  text: { textAlign: 'center' },
});
