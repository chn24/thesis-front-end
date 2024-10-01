import { create } from "zustand";
import { User } from "@/utils/type";

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
};

export const userStore = create<State & Actions>()((set, get) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
