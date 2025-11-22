import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

type EmployeeFormValues = {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employeeId: string;
};

const EmployeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
    .required("Phone number is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position is required"),
  employeeId: Yup.string().required("Employee ID is required"),
});

export default function EmployeeForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveEmployee = async (
    values: EmployeeFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSuccessMessage("");

      console.log("Employee saved:", values);

      setSuccessMessage("✅ Employee details are saved.");
      resetForm();
    } catch (err: any) {
      console.log("Employee save error:", err);
      setSubmitError("Failed to save employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>👤 Add Employee</Text>

        <Formik<EmployeeFormValues>
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            department: "",
            position: "",
            employeeId: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={handleSaveEmployee}
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
              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor="#800000"
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>

              {/* EMAIL */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="#800000"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              {/* PHONE */}
              <View style={styles.field}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10-digit phone number"
                  placeholderTextColor="#800000"
                  keyboardType="number-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>

              {/* DEPARTMENT */}
              <View style={styles.field}>
                <Text style={styles.label}>Department</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter department"
                  placeholderTextColor="#800000"
                  onChangeText={handleChange("department")}
                  onBlur={handleBlur("department")}
                  value={values.department}
                />
                {touched.department && errors.department && (
                  <Text style={styles.error}>{errors.department}</Text>
                )}
              </View>

              {/* POSITION */}
              <View style={styles.field}>
                <Text style={styles.label}>Position</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter position"
                  placeholderTextColor="#800000"
                  onChangeText={handleChange("position")}
                  onBlur={handleBlur("position")}
                  value={values.position}
                />
                {touched.position && errors.position && (
                  <Text style={styles.error}>{errors.position}</Text>
                )}
              </View>

              {/* EMPLOYEE ID */}
              <View style={styles.field}>
                <Text style={styles.label}>Employee ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="EMP123"
                  placeholderTextColor="#800000"
                  onChangeText={handleChange("employeeId")}
                  onBlur={handleBlur("employeeId")}
                  value={values.employeeId}
                />
                {touched.employeeId && errors.employeeId && (
                  <Text style={styles.error}>{errors.employeeId}</Text>
                )}
              </View>

              {/* SUBMIT ERROR */}
              {submitError && (
                <Text style={styles.errorCenter}>{submitError}</Text>
              )}

              {/* SAVE BUTTON */}
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Saving..." : "💾 Save Employee"}
                </Text>
              </TouchableOpacity>

              {/* SUCCESS MESSAGE */}
              {successMessage !== "" && (
                <Text style={styles.success}>{successMessage}</Text>
              )}
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

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
    color: "#800000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  field: {
    marginBottom: 18,
    paddingVertical: 8,
    width: "59%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#800000",
    marginBottom: 4,
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
  button: {
    backgroundColor: "#800000",
    padding: 12,
    borderRadius: 8,
    marginTop: 18,
    alignSelf: "center",
    width: "20%",
  },
  buttonDisabled: {
    backgroundColor: "#aa7777",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  success: {
    marginTop: 15,
    color: "green",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
