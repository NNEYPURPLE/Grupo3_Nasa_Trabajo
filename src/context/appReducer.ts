import type { NASAItem } from "../types/nasa";

export interface AppState {
  favorites: NASAItem[];
  searchHistory: string[];
}

export type AppAction =
  | { type: "ADD_FAVORITE"; payload: NASAItem }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "ADD_TO_HISTORY"; payload: string }
  | { type: "CLEAR_HISTORY" }
  | { type: "LOAD_STATE"; payload: AppState };

export const initialState: AppState = {
  favorites: [],
  searchHistory: [],
};

export const appReducer = (
  state: AppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((item) => {
          if ("date" in item) return item.date !== action.payload;
          if ("data" in item && item.data?.[0]?.nasa_id) {
            return item.data[0].nasa_id !== action.payload;
          }
          return String((item as any).id) !== action.payload;
        }),
      };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        searchHistory: [
          action.payload,
          ...state.searchHistory.filter((q) => q !== action.payload),
        ].slice(0, 20),
      };
    case "CLEAR_HISTORY":
      return { ...state, searchHistory: [] };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
};
