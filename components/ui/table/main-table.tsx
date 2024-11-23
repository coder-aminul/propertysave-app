import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MainTable = ({ columns, data }) => {
  // Create table instance using useReactTable
  const table = useReactTable({
    data, // Pass the data
    columns, // Pass the columns
    getCoreRowModel: getCoreRowModel(), // Set up core row model
  });

  // Destructure necessary table methods
  const { getHeaderGroups, getRowModel } = table;

  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.header}>
        {getHeaderGroups().map((headerGroup) => (
          <View style={styles.row} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Text key={header.id} style={styles.cell}>
                {header.isPlaceholder ? null : header.column.columnDef.header}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Table Body */}
      <View style={styles.body}>
        {getRowModel().rows.map((row) => (
          <View style={styles.row} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Text key={cell.id} style={styles.cell}>
                {cell.getValue()} {/* Use getValue to access the cell's value */}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default MainTable;
