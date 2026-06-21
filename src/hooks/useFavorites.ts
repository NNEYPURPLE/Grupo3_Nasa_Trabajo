import { useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import type { NASAItem } from "../types/nasa";
import { getNASAItemId } from "../types/nasa";

export const useFavorites = () => {
  const { state, addFavorite, removeFavorite, isFavorite } = useContext(AppContext);

  const toggleFavorite = useCallback(
    (item: NASAItem) => {
      const id = getNASAItemId(item);
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(item);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites: state.favorites,
    toggleFavorite,
    isFavorite,
  };
};
