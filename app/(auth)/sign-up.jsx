import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold text-secondary mb-6">Sign Up</Text>

        <TextInput
          className="w-full p-4 border border-secondary text-white rounded-lg mb-4"
          placeholder="Email"
          placeholderTextColor={"gray"}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-4 border border-secondary text-white rounded-lg mb-4"
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          className="w-full p-4 border border-secondary text-white rounded-lg mb-4"
          placeholder="Confirm Password"
          placeholderTextColor={"gray"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full bg-secondary p-4 rounded-lg mb-4"
        >
          <Text className="text-center text-white font-bold">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("sign-in")}>
          <Text className="text-gray-200">
            Already have an account? <Text className="text-secondary">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
