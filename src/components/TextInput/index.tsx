import React from 'react';
import {
  View,
  StyleSheet,
  TextInput as TI,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme';

const TextInput = ({
  placeholder,
  value,
  setValue,
  onPressSearch,
  isSearched,
}: {
  placeholder: string;
  value: string;
  setValue: any;
  onPressSearch: () => void;
  isSearched: boolean;
}) => {
  return (
    <>
      {!isSearched && (
        <View style={[styles.container, {}]}>
          <TI
            placeholder={placeholder}
            placeholderTextColor={'lightgray'}
            value={value}
            onChangeText={setValue}
            style={styles.input}
          />
        </View>
      )}
      <TouchableOpacity onPress={onPressSearch} style={styles.iconContainer}>
        <Icon name="search-outline" size={22} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 0,
    borderRadius: 30,
    backgroundColor: theme.bgWhite(0.3),
    marginTop: 20,
  },
  input: {
    marginLeft: 12,
    color: 'lightgray',
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgWhite(0.3),
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top:20,
    padding: 10,
  },
  icon: {},
});
