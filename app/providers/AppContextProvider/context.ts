"use client";

import { createContext } from "react";
import type { Session } from "next-auth";
import { User } from "@/app/lib/auth";

// App context interface
export interface AppContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

export const appContextDefaultValue: AppContextType = {
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: () => {},
  refetchUser: async () => {},
};

const AppContext = createContext<AppContextType>(appContextDefaultValue);

export default AppContext;
