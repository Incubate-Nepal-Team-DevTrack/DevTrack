"use client";

import { createContext, useContext, useState } from "react";
type contextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};
const defaultValue: contextType = {
  count: 0,
  setCount: () => {},
};
const AppContext = createContext<contextType>(defaultValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(1);
  return (
    <AppContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
