import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type radionbuttonGruptype = {
  selectedValue?: string | undefined | any;
  setSelectedValue: Function;
};

const RadioButton = ({ label, value, selectedValue, onPress }) => (
  <TouchableOpacity
    className={Platform.OS === 'ios' ? 'px-2' : '!pb-0'}
    style={styles.radioButtonContainer}
    onPress={() => onPress(value)}>
    <View style={[styles.radioButton, selectedValue === value && styles.selectedRadioButton]}>
      {selectedValue === value && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const RadioButtonGroup = ({ selectedValue, setSelectedValue }: radionbuttonGruptype) => {
  //   const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <RadioButton
        label="Company"
        value="company"
        selectedValue={selectedValue}
        onPress={handleSelect}
      />
      <RadioButton
        label="Individual"
        value="individual"
        selectedValue={selectedValue}
        onPress={handleSelect}
      />

      {/* <Text style={styles.selectedText}>Selected: {selectedValue}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#3498db',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  label: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RadioButtonGroup;
