import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const LocationTable = () => {
  const tableHead = ['Province', 'District', 'To Date', 'Time'];
  const tableData = [
    ['1', '2', '3', 'd'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd'],
  ];

  return (
    <ScrollView style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper>
          <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
      </Table>
    </ScrollView>
  );
};

export default LocationTable;

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff', height: 400 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  row: { height: 28, borderBottomColor: 'red' },
  text: { textAlign: 'center' },
});
