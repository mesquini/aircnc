import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  Alert,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List({navigation}) {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userId").then(user_id => {
      const socket = socketio("http://192.168.0.217:3333", {
        query: { user_id }
      });
      socket.on("booking_request", booking => {
        Alert.alert(
          'Mensagem',`Sua reserva em ${booking.spot.company} em ${booking.date} foi 
          ${booking.approved ? "APROVADO" : "REJEITADO"}`
        );
      });
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  function handleBack(){
    AsyncStorage.removeItem('userId')
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={StyleSheet.container}>
      <TouchableOpacity onPress={handleBack}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <ScrollView style={styles.scroll}>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 28,
    marginBottom: 5,
  },
  scroll: {
    marginBottom: 50
  }
});
