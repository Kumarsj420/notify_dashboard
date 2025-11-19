"use client";

import { Session } from "next-auth";
import SessionProvider from "./SessionProvider";
import React from "react";
import AppContextProvider from "./AppContextProvider";
import AppProgressProvider from "./AppProgressProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ReactQueryProvider>
      <AppProgressProvider>
        <AppContextProvider value={{ session }}>
          <SessionProvider session={session}>{children}</SessionProvider>
        </AppContextProvider>
      </AppProgressProvider>
    </ReactQueryProvider>
  );
}
