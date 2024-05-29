import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const signIn = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.formLogin}>
        {/* Image SignIn */}
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>Sign In</Text>
          {/* Input */}
          <View style={{ gap: 16 }}>
            {/* Email input */}
            <View style={styles.mailInput}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>
            {/* Password and Forgot password input */}
            <View style={{ gap: 12 }}>
              <View style={styles.mailInput}>
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text style={styles.forgotInput}>Forgot password?</Text>
            </View>

            {/* Submit button */}
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Sign In</Text>
            </TouchableOpacity>

            {/* sign up text */}
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: hp(1.8),fontWeight: "600", color: "#6B7280"}}> Don't have an account?</Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text style={{ fontSize: hp(1.8),fontWeight: "bold", color: "#6366F1"}}> Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default signIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formLogin: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    flex: 1,
    gap: 12,
  },
  containerImage: {
    alignItems: "center",
  },
  image: {
    height: hp(25),
  },
  title: {
    gap: 10,
  },
  titleText: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    color: "#2d3748",
  },
  mailInput: {
    height: hp(7),
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#f7fafc",
    alignItems: "center",
    borderRadius: 12,
    gap: 16,
  },
  input: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: "600",
    color: "#4a5568",
  },
  forgotInput: {
    fontSize: hp(1.8),
    fontWeight: "600",
    textAlign: "right",
    color: "#6B7280",
  },
  submitButton: {
    height: hp(6.5),
    backgroundColor: "#6366F1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: hp(2.7),
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
