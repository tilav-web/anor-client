import { User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: User | null | undefined;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User | null) => set({ user }),
  clearUser: () => set({ user: null }),
}));
