import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Avatar, Text, Badge } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Search from "./SearchLocation";
import MapData from "./Map";
const DogList = ({ navigation }) => {
  const [dogData, setDogData] = useState([]);
  const [breedFilter, setBreedFilter] = useState(null);
  const [colorFilter, setColorFilter] = useState(null);
  const [genderFilter, setGenderFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  useEffect(() => {
    fetchDogData();
  }, []);

  useEffect(() => {
    console.log(locationFilter, "location filter");
  }, []);

  const navigateToRegisterForm = () => {
    navigation.navigate("RegisterDogForm");
  };
  const fetchDogData = async () => {
    try {
      const response = await axios.get(
        "https://infasta-85e53-default-rtdb.firebaseio.com/dogs.json"
      );

      if (response.data) {
        const dogList = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setDogData(dogList.reverse());
      } else {
        console.log("Response data is undefined or null.");
      }
    } catch (error) {
      console.log("Error fetching dog data:", error);
    }
  };

  const applyFilters = () => {
    let filteredData = [...dogData];

    if (breedFilter) {
      filteredData = filteredData.filter(
        (item) => item.dogBreed === breedFilter
      );
    }

    if (colorFilter) {
      filteredData = filteredData.filter(
        (item) => item.dogColor === colorFilter
      );
    }

    if (genderFilter) {
      filteredData = filteredData.filter(
        (item) => item.dogGender === genderFilter
      );
    }

    if (locationFilter !== "") {
      filteredData = filteredData.filter((item) =>
        item.dogLocation.includes(locationFilter)
      );
    }

    return filteredData;
  };

  const handleFilterReset = () => {
    setBreedFilter(null);
    setColorFilter(null);
    setGenderFilter(null);
    setLocationFilter("");
  };

  const handlePlaceSelect = (data, details = null) => {
    const selectedPlace = data.description.split(",")[0];
    setLocationFilter(selectedPlace);
  };

  const renderDogItem = ({ item }) => (
    <View style={styles.renderStyle}>
      <View style={styles.dogItemContainer}>
        <View style={styles.avatarStyle}>
          {item.dogPhoto && <Avatar image={{ uri: item.dogPhoto }} />}
        </View>

        <View style={styles.dogInfo}>
          <View style={styles.dogDetailsRow}>
            <Text variant="button">{item.dogName}</Text>
            <Text variant="body1">Breed {item.dogBreed}</Text>
          </View>

          <View style={styles.dogDetailsRow}>
            <Badge color="green" style={{ height: 20 }}>
              <Text style={{ color: "white" }}>{item.dogColor}</Text>
            </Badge>
            <Badge color="#27248f" style={{ height: 20 }}>
              <Text style={{ color: "white" }}>{item.dogGender}</Text>
            </Badge>
          </View>

          <Text style={styles.dogLocationStyle}>
            <Badge style={{ height: 20 }}>
              <Text style={{ color: "black" }}>{item.dogLocation}</Text>
            </Badge>
          </Text>
        </View>
      </View>
      <View style={styles.userStyle}>
        <Text variant="subtitle2">Owned by {item.name}</Text>
        <Text variant="subtitle2">Contact number: {item.mobile}</Text>
      </View>
    </View>
  );

  const filteredDogData = applyFilters();

  return (
    <View
      style={{
        marginBottom: 50,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <View style={{ padding: 20, width: "80%", marginLeft: 20 }}>
        <Search handlePlaceSelect={handlePlaceSelect} />
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <MapData filteredData={filteredDogData} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <View>
            <Picker
              selectedValue={breedFilter}
              style={{ height: 10, width: 150 }}
              onValueChange={(itemValue) => setBreedFilter(itemValue)}
            >
              <Picker.Item label="Breed" value={null} />
              <Picker.Item label="Breed 1" value="1" />
              <Picker.Item label="Breed 2" value="2" />
              <Picker.Item label="Breed 3" value="3" />
            </Picker>
          </View>
          <View>
            <Picker
              selectedValue={genderFilter}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue) => setGenderFilter(itemValue)}
            >
              <Picker.Item label="Gender" value={null} />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <View>
            <Picker
              selectedValue={colorFilter}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue) => setColorFilter(itemValue)}
            >
              <Picker.Item label="Color" value={null} />
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Grey" value="Grey" />
              <Picker.Item label="Brown" value="Brown" />
            </Picker>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              marginBottom: 10,
            }}
            onPress={handleFilterReset}
          >
            <Text>Reset Filters</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={filteredDogData}
            keyExtractor={(item) => item.id}
            renderItem={renderDogItem}
          />
        </View>
      </ScrollView>
      <TouchableHighlight
        style={{ backgroundColor: "#007bff", ...styles.registerButton }}
        onPress={navigateToRegisterForm}
        underlayColor="#0056b3"
      >
        <View>
          <Text style={styles.buttonText}>Register your Dog</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  renderStyle: {
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "#60db81",
    borderStyle: "solid",
    backgroundColor: "white",
  },
  userStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  avatarStyle: {
    paddingLeft: 20,
  },
  dogItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dogInfo: {
    flex: 1,
  },

  dogName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dogLocationStyle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  dogDetailsRow: {
    fontSize: 14,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  registerButton: {
    position: "absolute",
    top: 650,
    left: 70,
    right: 0,
    zIndex: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingTop: 10,
    height: 40,
    width: 200,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default DogList;
// {
//   "rules": {
//     ".read": "now < 1694716200000",  // 2023-9-15
//     ".write": "now < 1694716200000",  // 2023-9-15
//   }
// }
