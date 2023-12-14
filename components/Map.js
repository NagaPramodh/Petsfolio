import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const MapData = ({ filteredData }) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [dogData, setDogData] = useState(filteredData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://infasta-85e53-default-rtdb.firebaseio.com/dogs.json"
        );

        const data = response.data;

        // setDogData(Object.values(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
      } else {
        console.error("Location permission not granted");
      }
    };

    fetchLocation();
  }, []);

  const markers = dogData.map((dog) => (
    <Marker
      key={dog.dogName}
      coordinate={{
        latitude: dog.latitude,
        longitude: dog.longitude,
      }}
      title={dog.dogName}
      description={`Location: ${dog.dogLocation}, Color: ${dog.dogColor}`}
    />
  ));

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={{ backgroundColor: "#007bff", ...styles.openButton }}
        onPress={() => setShowMapModal(true)}
        underlayColor="#0056b3"
      >
        <View>
          <Text style={styles.buttonText}>View Map</Text>
        </View>
      </TouchableHighlight>
      <Modal visible={showMapModal} animationType="slide">
        <View st8yle={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={
              currentLocation
                ? {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 3.0,
                    longitudeDelta: 3.0,
                  }
                : {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 3.0,
                    longitudeDelta: 3.0,
                  }
            }
          >
            {markers}
          </MapView>
        </View>

        <TouchableHighlight
          style={{ backgroundColor: "#007bff", ...styles.closeButton }}
          onPress={() => setShowMapModal(false)}
          underlayColor="#0056b3"
        >
          <View>
            <Text style={styles.buttonText}>Close Map</Text>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

export default MapData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openButton: {
    top: 0,
    left: 80,
    right: 0,
    zIndex: 1,
    borderRadius: 20,
    paddingTop: 10,
    height: 40,
    width: 150,
  },
  closeButton: {
    position: "absolute",
    top: 700,
    left: 100,
    right: 0,
    zIndex: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingTop: 10,
    height: 40,
    width: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
