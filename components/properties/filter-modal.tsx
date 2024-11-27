import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '../nativewindui/Button';
import { Checkbox } from '../nativewindui/Checkbox';

const MultiSelectPicker = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const categories = ['Residential', 'Commercial', 'Industrial', 'Mixed Use'];

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Remove the category if it's already selected
        return prev.filter((item) => item !== category);
      } else {
        // Add the category if it's not selected
        return [...prev, category];
      }
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCategories.includes(item);
    return (
      <View style={styles.itemContainer}>
        <Checkbox checked={isSelected} onCheckedChange={() => toggleCategorySelection(item)} />
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };
  console.log(selectedCategories);
  return (
    <View style={styles.container}>
      <Button onPress={() => setIsModalVisible(true)}>
        <Text>Hello</Text>
      </Button>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

            <FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item} />

            <TouchableOpacity style={styles.applyButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default MultiSelectPicker;
