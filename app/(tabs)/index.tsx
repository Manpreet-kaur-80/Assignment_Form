import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi! Welcome to Our App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sign-in")}
      >
        <Text style={styles.buttonText}>🔐 Sign-In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sign-up")}
      >
        <Text style={styles.buttonText}>📝 Sign-Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push("/employee-form")}
      >
        <Text style={styles.buttonText}>👨‍💼 Employee-Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#800000",
  },
  button: {
    backgroundColor: "#800000",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonSecondary: {
    backgroundColor: "#b33a3a",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});


