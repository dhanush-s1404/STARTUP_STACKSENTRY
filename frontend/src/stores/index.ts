import { create } from "zustand";
import type { SearchHistoryItem } from "@/types";

type UIState = {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  searchHistory: SearchHistoryItem[];
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null,
  searchHistory: [],
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  addSearchHistory: (query) => {
    const { searchHistory } = get();
    const filtered = searchHistory.filter((item) => item.query !== query);
    set({
      searchHistory: [{ query, timestamp: Date.now() }, ...filtered].slice(0, 10),
    });
  },
  clearSearchHistory: () => set({ searchHistory: [] }),
}));
