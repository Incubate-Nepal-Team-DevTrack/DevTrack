"use client";
import ProjectData from "../../../data.json";
import { createContext, useContext, useState } from "react";
type contextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: string | null;
  filter: { ward: string; type: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ ward: string; type: string }>
  >;
  selectedProject: any;
  setSelectedProject: React.Dispatch<React.SetStateAction<any | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
};
const defaultValue: contextType = {
  count: 0,
  filter: { ward: "All", type: "All" },
  setFilter: () => {},
  selectedOption: "detail",
  setSelectedOption: () => {},
  setCount: () => {},
  selectedProject: ProjectData[0],
  setSelectedProject: () => {},
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
  const [selectedProject, setSelectedProject] = useState<any | null>(
    ProjectData[0]
  );
  const [selectedOption, setSelectedOption] = useState<string | null>("deatil");
  return (
    <AppContext.Provider
      value={{
        filter,
        selectedProject,
        setSelectedProject,
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
