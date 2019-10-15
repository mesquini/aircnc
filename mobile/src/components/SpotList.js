import React, { useEffect, useState } from "react";
import { withNavigation, NavigationEvents } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import api from "../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const { data } = await api.get("/spots", {
        params: { tech }
      });
      setSpots(data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Booking", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>{" "}
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$${item.price}` : "GRATUITO"}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigate(item._id)}
              style={styles.button}
            >
              <Text style={styles.txtBtn}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  bold: {
    fontWeight: "bold"
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 25,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2,
    paddingHorizontal: 20
  },
  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },

  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15,
  },
  txtBtn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default withNavigation(SpotList);
