import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

const VenueCard = ({ name, city, capacity, floodlight, image }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { incrementFavorite, decrementFavorite } = useFavorites();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      incrementFavorite();
    } else {
      decrementFavorite();
    }
  };

  return (
    <View className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg mb-4">
      {image ? (
        <Image source={{ uri: image }} className="w-full h-40" resizeMode="cover" />
      ) : (
        <View className="w-full h-40 bg-gray-300 flex items-center justify-center">
          <Text className="text-gray-500">No Image Available</Text>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-black">{name}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-600 mb-1">{city}</Text>
        <Text className="text-gray-600 mb-1">Capacity: {capacity || "N/A"}</Text>
        <Text className="text-gray-600">Floodlights: {floodlight ? "Yes" : "No"}</Text>
      </View>
    </View>
  );
};

export default VenueCard;
