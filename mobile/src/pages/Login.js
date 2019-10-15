import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import api from "../services/api";
import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userId").then(user => {
      if (user) navigation.navigate("List");
    });
  }, []);

  async function handleSubmit() {
    if(!email)
      Alert.alert('Email é obrigatorio!')
    else if(!techs)
      Alert.alert('Entre com alguma tecnologia!')  
    else{
      const { data } = await api.post("/session", {
        email
      });
      const { _id } = data;
      await AsyncStorage.setItem("userId", _id);
      await AsyncStorage.setItem("techs", techs);
  
      navigation.navigate("List");
    }  
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>ENTRE COM AS TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="words"
          placeholder="Tecnologias separado por virgula"
          placeholderTextColor="#999"
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.txtBtn}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
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
  txtBtn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
