"use client";

import * as React from "react";

type Direction = "ltr" | "rtl";

interface DirectionProviderProps {
  children: React.ReactNode;
  direction?: Direction;
}

const DirectionContext = React.createContext<Direction | undefined>(undefined);

export function DirectionProvider({
  children,
  direction = "ltr",
}: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={direction}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = React.useContext(DirectionContext);
  if (context === undefined) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
