"use client";

import { useCallback, useEffect, useState } from "react";

import AppContext from "./context";
import { Session } from "next-auth";
import { User } from "@/lib/auth";
import API from "@/services/api";
import { useSession } from "next-auth/react";

const AppContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: {
    session: Session | null;
  };
}) => {
  const [user, setUser] = useState<User | null>(value?.session?.user || null);
  const [isLoading] = useState(true);
  const isAuthenticated = !!user?.id;

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const refetchUser = useCallback(async () => {
    try {
      if (value?.session?.token) {
        const userData = await API.get<User>(
          "/user/me",
          {},
          { headers: { Authorization: `Bearer ${value.session.token}` } }
        );
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [value?.session?.token]);

  useEffect(() => {
    setUser(value?.session?.user || null);
  }, [value?.session]);

  const val = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    logout,
    refetchUser,
    session: value?.session,
  };

  return <AppContext.Provider value={val}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
