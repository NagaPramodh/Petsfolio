import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Search = ({ handlePlaceSelect }) => {
  return (
    <View style={styles.autocompleteContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search for Dog Location"
        query={{
          key: "AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0",
          language: "en",
        }}
        onPress={handlePlaceSelect}
        onFail={(error) => console.error(error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Search;
