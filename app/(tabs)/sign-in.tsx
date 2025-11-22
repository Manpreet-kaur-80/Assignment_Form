import React, { useState } from "react";
import { StyleSheet,Text,View,TextInput,TouchableOpacity, } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

const signInValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Min 8 characters")
    .required("Password is required"),
});

// proper types for form values //
type SignInValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: SignInValues) => {
    try {
      setIsLoading(true);
      setFirebaseError(null);
      setSuccessMessage("");

      // Firebase email/password sign in //
      const userCred = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log("Signed in as:", userCred.user.uid);
      setSuccessMessage("✅ You are signed in!");

      // navigate after a short delay (so message is visible) //
      setTimeout(() => {
        router.replace("/employee-form");
      }, 1600);
    } catch (err: any) {
      console.log("Sign-in error:", err);
      setFirebaseError(err.message || "Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Sign In</Text>

      <Formik<SignInValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={signInValidation}
        onSubmit={handleLogin}
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
            {/* EMAIL FIELD */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Enter your email</Text>
              </View>

              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* error */}
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* helper (only if no error) */}
              {!errors.email && (
                <Text style={styles.helper}>
                  Your email that you used while sign-up...
                </Text>
              )}
            </View>

            {/* PASSWORD FIELD */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Enter your password</Text>
              </View>

              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />

              {/* error */}
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* helper (only if no error) */}
              {!errors.password && (
                <Text style={styles.helper}>Password created by you</Text>
              )}
            </View>

            {/* Firebase error */}
            {firebaseError && (
              <Text style={styles.errorCenter}>{firebaseError}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading && "Signing in..."}
                {!isLoading && "➡️ Sign In"}
              </Text>
            </TouchableOpacity>

            {/* success message */}
            {successMessage !== "" && (
              <Text style={styles.success}>{successMessage}</Text>
            )}
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.link}>← Back to Welcome Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#800000", // dark maroon
  },
  fieldContainer: {
    marginBottom: 20,
    paddingVertical: 8,
    width : "59%",
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
  },
  helper: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
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
  button: {
    backgroundColor: "#800000",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "20%",
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
  success: {
    marginTop: 15,
    color: "green",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#800000",
  },
});

