import React, { useState } from "react";
import {
  Text,
  AsyncStorage,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import api from "../services/api";

export default function Booking({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("userId");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitação de reserva enviada");

    navigation.navigate("List");
  }

  function handleCancelar() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        autoCapitalize="words"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.txtBtn}>Solicitar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCancelar}
        style={[styles.button, styles.cancelarButton]}
      >
        <Text style={styles.txtBtn}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    marginTop: 50,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelarButton: {
    backgroundColor: "#ccc",
    marginTop: 10
  },
  txtBtn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
