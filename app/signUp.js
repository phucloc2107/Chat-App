import { StyleSheet,Text, View,Image, TextInput,TouchableOpacity, Pressable, Alert} from "react-native";
import React, { useRef, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

const signUp = () => {
  const router = useRouter();
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current,profileRef.current);
    setLoading(false);

    console.log('got result: ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
    // Register process

  };

  return (
    <CustomKeyboardView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.formLogin}>
        {/* Image SignIn */}
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/images/register.png")}
          />
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>Sign Up</Text>
          {/* Input */}
          <View style={{ gap: 16 }}>
                {/* Username input */}
                <View style={styles.mailInput}>
                <Feather name="user" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => usernameRef.current = value}
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                />
              </View>
            {/* Email input */}
            <View style={styles.mailInput}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>
            {/* Password input */}
              <View style={styles.mailInput}>
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => passwordRef.current = value}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                />
              </View>
                {/* Profile url input */}
                <View style={styles.mailInput}>
                <Feather name="image" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => profileRef.current = value}
                  style={styles.input}
                  placeholder="Profile url"
                  placeholderTextColor={"gray"}
                />
              </View>

            {/* Submit button */}
            <View>
              {
                loading ? (
                  <View style={styles.loading}>
                    <Loading size={hp(6.5)}/>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
                    <Text style={styles.submitText}>Sign Up</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            {/* sign up text */}
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: hp(1.8), fontWeight: "600", color: "#6B7280"}}>Already have an account?</Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text style={{ fontSize: hp(1.8),fontWeight: "bold", color: "#6366F1"}}> Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formLogin: {
    paddingTop: hp(7),
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
  loading:{
    flexDirection:'row',
    justifyContent:'center'
  }
});
