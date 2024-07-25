"use client";

import { createContext, useContext, useState } from "react";
type contextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: string | null;
  filter: { ward: string; type: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ ward: string; type: string }>
  >;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
};
const defaultValue: contextType = {
  count: 0,
  filter: { ward: "All", type: "All" },
  setFilter: () => {},
  selectedOption: "detail",
  setSelectedOption: () => {},
  setCount: () => {},
};
const AppContext = createContext<contextType>(defaultValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState<{ ward: string; type: string }>({
    ward: "All",
    type: "All",
  });
  const [selectedOption, setSelectedOption] = useState<string | null>("deatil");
  return (
    <AppContext.Provider
      value={{
        filter,
        setFilter,
        count,
        setCount,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
