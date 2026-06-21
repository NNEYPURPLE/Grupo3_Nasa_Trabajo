import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  appReducer,
  initialState,
  type AppState,
  type AppAction,
} from "./appReducer";
import type { NASAItem } from "../types/nasa";

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addFavorite: (item: NASAItem) => void;
  removeFavorite: (id: string) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  isFavorite: (id: string) => boolean;
}

export const AppContext = createContext<AppContextValue>({
  state: initialState,
  dispatch: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  addToHistory: () => {},
  clearHistory: () => {},
  isFavorite: () => false,
});

const STORAGE_KEY = "nasa_app_state";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          dispatch({ type: "LOAD_STATE", payload: JSON.parse(savedState) });
        }
      } catch {
        // silently fail
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // silently fail
      }
    };
    persistState();
  }, [state]);

  const addFavorite = useCallback((item: NASAItem) => {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  }, []);

  const addToHistory = useCallback((query: string) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: query });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: "CLEAR_HISTORY" });
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return state.favorites.some((item) => {
        if ("date" in item) return item.date === id;
        if ("data" in item && item.data?.[0]?.nasa_id) {
          return item.data[0].nasa_id === id;
        }
        return String((item as any).id) === id;
      });
    },
    [state.favorites]
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addFavorite,
        removeFavorite,
        addToHistory,
        clearHistory,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
