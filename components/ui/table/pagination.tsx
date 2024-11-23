// src/components/Pagination.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TablePagination = ({ table }: { table: any }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={() => table.previousPage()} style={styles.pageButton}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <Text>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Text>
      <TouchableOpacity onPress={() => table.nextPage()} style={styles.pageButton}>
        <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default TablePagination;
