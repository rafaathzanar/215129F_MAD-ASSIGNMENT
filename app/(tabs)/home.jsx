import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import VenueCard from "../../components/VenueCard";
import { useFavorites } from "../../context/FavoritesContext";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const { favoritesCount } = useFavorites();

 
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail("");
    }
  }, []);

  useEffect(() => {
    fetch("https://cricket.sportmonks.com/api/v2.0/venues?api_token=FyZNUPFSas9YTiWQJ0tr7UdCKfxe3O8BoBOQssPjE9GNBpm7xVvfULLdbulO")
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setVenues(data.data.slice(0, 20));
        } else {
          Alert.alert("No venues found.");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Failed to fetch venues.");
      });
  }, []);

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-white">
  
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Hello, <Text className="text-xl font-bold text-gray-800 mb-2"> {"\n"}{userEmail || "Guest"}! </Text>
        </Text>
        <TextInput
          className="bg-white mt-6 p-3 rounded-lg text-gray-700 border border-black"
          placeholder="Search for venues"
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View>
        <Text className="p-4 text-2xl font-bold text-gray-800 mb-2">Favorites Count:</Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            backgroundColor: "blue",
            borderRadius: 50,
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {favoritesCount} <Ionicons name="heart" size={16} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="mt-4 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">Venues</Text>
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              name={venue.name}
              city={venue.city}
              capacity={venue.capacity}
              floodlight={venue.floodlight}
              image={venue.image_path}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
