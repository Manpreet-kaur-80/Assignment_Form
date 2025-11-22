import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

interface SignUpFormValues {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Name can not be less than 3 characters")
    .max(40, "Name can not exceed 40 characters")
    .required("Full name is required"),
  userName: Yup.string()
    .min(3, "User name can't be less than 3 characters")
    .max(20, "User name can't be more than 20 characters"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      setFirebaseError(null);
      setSuccessMessage("");

      await createUserWithEmailAndPassword(auth, values.email, values.password);

      setSuccessMessage("✅ Account created successfully!");

      setTimeout(() => {
        router.replace("./index.tsx");
      }, 800);
    } catch (error: any) {
      console.error("Sign up error:", error);
      setFirebaseError(error.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>📝 Sign Up</Text>

        <Formik<SignUpFormValues>
          initialValues={{
            fullName: "",
            userName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* FULL NAME */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Full Name</Text>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>

              {/* USER NAME */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>User Name (optional)</Text>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                />
                {touched.userName && errors.userName && (
                  <Text style={styles.error}>{errors.userName}</Text>
                )}
              </View>

              {/* EMAIL */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Email</Text>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              {/* PHONE */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Contact Number (10 digits)</Text>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>

              {/* PASSWORD */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              {/* CONFIRM PASSWORD */}
              <View style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Confirm Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Firebase error */}
              {firebaseError && (
                <Text style={styles.errorCenter}>{firebaseError}</Text>
              )}

              {/* success message */}
              {successMessage !== "" && (
                <Text style={styles.success}>{successMessage}</Text>
              )}

              {/* BUTTON */}
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Creating..." : "Create Account"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/")}>
                <Text style={styles.link}>← Back to Welcome Page</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#800000",
  },
  fieldContainer: {
    marginBottom: 20,
    paddingVertical: 8,
    width: "59%",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#800000",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#aa7777",
    paddingVertical: 6,
    fontSize: 16,
    color: "#800000",
    backgroundColor: "#e6f0ff",
  },
  error: {
    fontSize: 12,
    color: "#b00020",
    marginTop: 4,
  },
  errorCenter: {
    fontSize: 13,
    color: "#b00020",
    marginTop: 8,
    textAlign: "center",
  },
  success: {
    marginTop: 15,
    color: "green",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#800000",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "20%",
    alignSelf: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aa7777",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#800000",
  },
});
