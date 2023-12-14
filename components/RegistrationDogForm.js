import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import axios from "axios";
import Search from "./SearchLocation";
import { TextInput, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

const RegisterDogForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogColor, setDogColor] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogLocation, setDogLocation] = useState("");
  const [dogPhoto, setDogPhoto] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigation = useNavigation();
  const handlePlaceSelect = (data, details = null) => {
    const selectedPlace = data.description.split(",")[0];
    setDogLocation(selectedPlace);
    console.log(dogLocation);
  };
  console.log(latitude, longitude, "longitude");
  const getCoordinates = async () => {
    try {
      const apiKey = "AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${dogLocation}&key=${apiKey}`
      );
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      } else {
        console.error("City not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
    }
  };
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "https://infasta-85e53-default-rtdb.firebaseio.com/dogs.json",
        {
          name,
          mobile,
          dogBreed,
          dogName,
          dogColor,
          dogGender,
          dogPhoto,
          dogLocation,
          latitude,
          longitude,
        }
      );

      console.log("Dog registered:", response.data);
    } catch (error) {
      console.log("Error registering dog:", error);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <TouchableHighlight
        style={{ backgroundColor: "#007bff", ...styles.button }}
        onPress={async () => {
          await getCoordinates();
          handleFormSubmit();
          navigation.navigate("DogList");
        }}
        underlayColor="#0056b3"
      >
        <View>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableHighlight>
      <ScrollView
        style={{ backgroundColor: "white", padding: 20, paddingTop: 80 }}
      >
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          variant="standard"
          placeholder="Enter your name "
        />

        <Text>Mobile Number</Text>
        <TextInput
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          variant="standard"
          placeholder="Enter you Mobile Number"
        />
        <Text>Dog Location</Text>
        <View style={{ padding: 20 }}>
          <Search handlePlaceSelect={handlePlaceSelect} />
        </View>

        <Text style={{ marginTop: 20 }}>Dog Name</Text>
        <TextInput
          value={dogName}
          onChangeText={setDogName}
          variant="standard"
          placeholder="Enter your Dog Name"
        />

        <Text>Dog Color</Text>
        <TextInput
          value={dogColor}
          onChangeText={setDogColor}
          variant="standard"
          placeholder="Enter your Dog Color"
        />

        <Text>Dog Gender</Text>
        <TextInput
          value={dogGender}
          onChangeText={setDogGender}
          variant="standard"
          placeholder="Enter your Dog Gender"
        />

        <Text>Dog Breed</Text>
        <TextInput
          value={dogBreed}
          onChangeText={setDogBreed}
          variant="standard"
          placeholder="Enter your Dog Breed"
        />

        <Text>Dog Photo</Text>
        <TextInput
          value={dogPhoto}
          onChangeText={setDogPhoto}
          variant="standard"
          placeholder="Enter URL of Dog Picture"
        />
      </ScrollView>
    </View>
  );
};

export default RegisterDogForm;
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 0,
    left: "0",
    right: 0,
    zIndex: 1,
    margin: 20,
    borderRadius: 20,
    marginBottom: 50,
    paddingTop: 5,
    paddingBottom: 5,
    height: 40,
    width: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 160,
    backgroundColor: "#ecf0f1",
  },
});
