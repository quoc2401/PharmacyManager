import { User } from "./../shared/types";
import create from "zustand";

interface StoreType {
  currentUser: undefined | null | User;
  setCurrentUser: (user: Object | null) => void;
}

export const useStore = create<StoreType>((set: any) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
