import React, { createContext, useContext, useState } from "react";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  const incrementFavorite = () => setFavoritesCount((prev) => prev + 1);
  const decrementFavorite = () => setFavoritesCount((prev) => Math.max(prev - 1, 0));

  return (
    <FavoritesContext.Provider value={{ favoritesCount, incrementFavorite, decrementFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => useContext(FavoritesContext);
