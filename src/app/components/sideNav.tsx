"use client";

import React, { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";

const SideNav = () => {
  const data = {
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
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-65 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <div
          style={{
            position: "fixed",
            width: 300,
            height: 50,
            zIndex: 1,
          }}
        >
          <Input
            placeholder="Search Projects"
            style={{
              height: 50,
            }}
          />
        </div>
        <ul
          className="space-y-2 font-medium pt-2  "
          style={{
            marginTop: 50,
          }}
        >
          {data.projects.map((project) => (
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
                      {project.contractor}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    >
                      {project.location}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
