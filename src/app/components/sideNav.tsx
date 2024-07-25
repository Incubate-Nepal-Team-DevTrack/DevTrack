"use client";

import React, { useState, useEffect, useContext, lazy } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import CorporateFareSharpIcon from "@mui/icons-material/CorporateFareSharp";
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import project_types from "./dataComponents/projectTypes";
import wards from "./dataComponents/wards";
import AppContext from "../context/Context";
const SideNav = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    filter,
    setFilter,
    count,
    setCount,
    selectedOption,
    setSelectedOption,
  } = useContext(AppContext);
  const initialData = {
    projects: [
      {
        name: "Melamchi Water Project",
        date: "1st June 2021",
        status: "On Progress",
        contractor: "Pappu Construction",
        location: "Kathmandu Valley",
        color: "#1EA362",

        abandoned: false,
      },
      {
        name: "Gautam Buddha Intl Stadium",
        date: "1st June 2021",
        status: "Abandoned",
        contractor: "Pappu Construction",
        location: "Bharatpur, Chitwan",
        color: "red",
        abandoned: true,
      },
      {
        name: "Gautam Buddha Intl Stadium",
        date: "1st June 2021",
        status: "Abandoned",
        contractor: "Pappu Construction",
        location: "Bharatpur, Chitwan",
        color: "red",
        abandoned: true,
      },
      {
        name: "Gautam Buddha Intl Stadium",
        date: "1st June 2021",
        status: "Abandoned",
        contractor: "Pappu Construction",
        location: "Bharatpur, Chitwan",
        color: "red",
        abandoned: true,
      },
      {
        name: "Gautam Buddha Intl Stadium",
        date: "1st June 2021",
        status: "Abandoned",
        contractor: "Pappu Construction",
        location: "Bharatpur, Chitwan",
        color: "red",
        abandoned: true,
      },
      {
        name: "Gautam Buddha Intl Stadium",
        date: "1st June 2021",
        status: "Abandoned",
        contractor: "Pappu Construction",
        location: "Bharatpur, Chitwan",
        color: "red",
        abandoned: true,
      },
    ],
  };
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [duplicateDta, setDuplicateData] = useState(initialData);

  async function Search(value: string) {
    console.log(value);
    const data = initialData.projects.filter((project) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setDuplicateData({
      projects: data,
    });
  }

  return (
    <aside
      style={{
        height: "100vh",
      }}
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-65 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <div
          style={{
            position: "fixed",
            width: 300,
            zIndex: 5,
          }}
        >
          <Input
            onChange={(e) => {
              Search(e.target.value);
            }}
            placeholder="Search Projects"
            style={{
              height: 50,
            }}
          />
        </div>
        <div
          style={{
            zIndex: 1,
            width: "300px",
            height: 50,
            marginTop: 45,
            position: "fixed",
            backgroundColor: "white",

            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
            className="flex flex-row justify-between"
          >
            <Button
              style={{
                alignSelf: "flex-end",
                right: 0,
                fontSize: 14,
                position: "absolute",
                backgroundColor: "white",
                color: "grey",
                borderColor: "black",
              }}
              onPress={onOpen}
            >
              <FilterListSharpIcon
                style={{
                  height: 16,
                  width: 16,
                  color: "grey",
                }}
              />
              Filter
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 ">
                      Selct the Desired Filter
                    </ModalHeader>
                    <ModalBody>
                      <Select
                        typeof="text"
                        style={{
                          flex: 0.4,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "black",
                          zIndex: 1,
                          backgroundColor: "white",
                          color: "black",
                        }}
                        isRequired
                        label="Ward"
                        placeholder="Select a ward"
                        defaultSelectedKeys={[""]}
                      >
                        {wards.map((ward) => (
                          <SelectItem
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              padding: 4,
                            }}
                            key={ward.key}
                          >
                            {ward.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        typeof="text"
                        style={{
                          height: 30,
                          flex: 0.4,
                          marginTop: 10,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "black",
                          zIndex: 1,
                          fontSize: 12,
                          backgroundColor: "white",
                          color: "black",
                        }}
                        isRequired
                        label="Type"
                        placeholder="Project Type"
                        defaultSelectedKeys={[""]}
                      >
                        {project_types.map((type) => (
                          <SelectItem
                            onSelect={(e) => {
                              console.log(e);
                            }}
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              padding: 4,
                            }}
                            key={type.key}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Set Filter
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>{" "}
          </div>
        </div>
        <ul
          className="space-y-2 font-medium pt-2  "
          style={{
            marginTop: 100,
          }}
        >
          {duplicateDta.projects.length !== 0 ? (
            duplicateDta.projects.map((project) => (
              <li
                onClick={() => setSelectedProject(project.name)}
                style={{
                  width: 300,
                }}
              >
                <div
                  style={{
                    // backgroundColor:
                    //   selectedProject === project.name ? "#603CC7" : "white",
                    borderWidth: selectedProject === project.name ? 2 : 0,
                    borderColor:
                      selectedProject === project.name ? "#603CC7" : "",
                    borderStyle: "dashed",
                  }}
                  className="max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* <AutoModeIcon /> */}
                      {/* <AutoModeIcon
                        style={{ color: project.color, height: 20, width: 20 }}
                      /> */}
                      <h5
                        style={{
                          flex: 0.9,
                        }}
                        className="mb-0 text1xl font-bold tracking-tight text-gray-900 dark:text-white"
                      >
                        {project.name}
                      </h5>
                      <div
                        style={{
                          flex: 0.1,
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "flex-end",
                            height: 15,
                            width: 15,
                            borderRadius: 10,
                            backgroundColor: project.abandoned
                              ? "red"
                              : "#1EA362",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div
                      className="mb-1"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                          marginRight: "10px",
                        }}
                      >
                        {/* <DateRangeSharpIcon
                          style={{
                            height: 15,
                            width: 15,
                            color: "blue",
                            marginRight: 5,
                          }}
                        /> */}
                        {project.date}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                          marginRight: "10px",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div
                      className="mb-1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                          marginRight: "10px",
                        }}
                      >
                        <CorporateFareSharpIcon
                          style={{
                            height: 15,
                            width: 15,
                            color: "blue",
                            marginRight: 5,
                          }}
                        />
                        {project.contractor}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                          marginRight: "10px",
                        }}
                      >
                        <LocationOnSharpIcon
                          style={{
                            height: 15,
                            width: 15,
                            color: "blue",
                            marginRight: 5,
                          }}
                        />
                        {project.location}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li
              style={{
                width: 300,
              }}
            >
              <div
                style={{
                  // backgroundColor:
                  //   selectedProject === project.name ? "#603CC7" : "white",

                  borderStyle: "dashed",
                }}
                className="max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <p>No Data found</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
