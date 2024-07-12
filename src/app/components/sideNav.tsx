import React from "react";
import { Input } from "@/components/ui/input";

const SideNav = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-65 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium pt-2 ">
          <li>
            <Input
              placeholder="Search Projects"
              style={{
                height: 50,
              }}
            />
          </li>
          <li
            style={{
              width: 300,
            }}
          >
            <div className="max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                    Melamchi Water Project
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
                        backgroundColor: "#1EA362",
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
                    1st June 2021
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "gray",
                      marginRight: "10px",
                    }}
                  >
                    On Progress
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
                    Pappu Construction{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "gray",
                      marginRight: "10px",
                    }}
                  >
                    Kathmandu Valley{" "}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li
            style={{
              width: 300,
            }}
          >
            <div className="max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                    Gautam Buddha Intl Stadium
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
                        backgroundColor: "red",
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
                    1st June 2021
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "gray",
                      marginRight: "10px",
                    }}
                  >
                    Abandoned{" "}
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
                    Pappu Construction{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "gray",
                      marginRight: "10px",
                    }}
                  >
                    Bharatpur, Chitwan{" "}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
