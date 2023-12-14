import { View, StyleSheet, TextInput, Button } from "react-native";
import { React, useState, useRef } from "react";
import { getApp, initializeApp } from "firebase/app";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import firebaseConfig from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@react-native-material/core";
try {
  initializeApp(firebaseConfig);
} catch (error) {
  console.log("Initializing error ", error);
}

const app = getApp();
const auth = getAuth(app);

const UserRegistration = () => {
  const recaptchaVerifier = useRef(null);
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationID] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [info, setInfo] = useState("");
  const attemptInvisibleVerification = false;

  const handleSendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationID(verificationId);
      setInfo("Verification code has been sent to your phone");
      console.log(verificationId);
    } catch (error) {
      setInfo(`Error : ${error.message}`);
    }
  };
  const handleVerifyVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      setInfo("Success: Phone authentication successful");
      navigation.navigate("DogList");
    } catch (error) {
      setInfo(`Error : ${error.message}`);
    }
  };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      {info && <Text style={styles.text}>{info}</Text>}

      {!verificationId && (
        <View>
          <Text style={{ marginBottom: 5 }}>
            Enter your Mobile Number to Login
          </Text>
          <Text style={styles.text}>Enter the phone number</Text>

          <TextInput
            placeholder="+917730087821"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />

          <Button
            onPress={() => handleSendVerificationCode()}
            title="Send Verification Code"
            disabled={!phoneNumber}
          />
        </View>
      )}

      {verificationId && (
        <View>
          <Text style={styles.text}>Enter the verification code</Text>

          <TextInput
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />

          <Button
            title="Confirm Verification Code"
            disabled={!verificationCode}
            onPress={() => handleVerifyVerificationCode()}
          />
        </View>
      )}

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#aaa",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default UserRegistration;
