import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserRegistration from "./screens/SignInScreen";
const Stack = createStackNavigator();
import DogList from "./components/DogList";
import RegisterDogForm from "./components/RegistrationDogForm";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={UserRegistration}
          options={{ title: "User Registration" }}
        />

        <Stack.Screen
          name="DogList"
          component={DogList}
          options={{ title: "Dog List" }}
        />
        <Stack.Screen
          name="RegisterDogForm"
          component={RegisterDogForm}
          options={{ title: "Register Dog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
