import React from "react";
import { CardHoverEffect } from "../card/card";
import { AnimatedTooltipPreview } from "../tooltip/tooltip";
import { PeopleCard } from "./peopleCards";
import AppContext from "@/app/context/Context";
import { useContext } from "react";
const ProjectRevealCardComponent = () => {
  let {
    count,
    setCount,
    selectedOption,
    setSelectedOption,
    selectedProject,
    setSelectedProject,
  } = useContext(AppContext);
  console.log("hello" + selectedProject);
  return (
    <div
      className="flex flex-col w-full"
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <div
        className="w-full"
        style={{
          marginTop: 10,
          width: "100%",
        }}
      >
        <img
          className="w-full"
          style={{
            height: 300,
            borderRadius: "0.375rem",
          }}
          src={selectedProject.project_horizontal_image}
          alt="Melamchi Water Supply Project"
        />
      </div>
      <div className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5
          style={{
            color: "black",
            zIndex: 100,
          }}
          className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
        >
          {selectedProject.project_name}
        </h5>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "grey",
                zIndex: 100,
                fontWeight: 600,
              }}
            >
              {selectedProject?.project_authority}{" "}
            </p>
          </div>
          <div className="flex flex-col justify-center items-right">
            {" "}
            <AnimatedTooltipPreview />
          </div>
        </div>

        <p
          style={{
            fontSize: "1rem",
            zIndex: 100,
            marginTop: 20,
          }}
          className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400"
        >
          {selectedProject?.project_description}
        </p>

        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <ul
            className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li className="w-full">
              <button
                id="stats-tab"
                data-tabs-target="#stats"
                type="button"
                role="tab"
                aria-controls="stats"
                aria-selected="true"
                className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Statistics of the Project
              </button>
            </li>
          </ul>
          <div
            id="fullWidthTabContent"
            className="border-t border-gray-200 dark:border-gray-600 "
          >
            <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">
                    {selectedProject?.project_start_date}
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Starting Date{" "}
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">
                    {selectedProject?.project_completion_date != null
                      ? selectedProject?.project_completion_date
                      : "In Progress"}
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Completion Date
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">
                    {selectedProject?.project_budget
                      ? selectedProject?.project_budget
                      : "Not Available"}
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">Budget</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">90</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Labours Working
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt
                    style={{
                      textAlign: "center",
                    }}
                    className="mb-2 text-2xl font-bold justify-center"
                  >
                    {selectedProject?.project_contractor}
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Contractor
                  </dd>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-bold">
                    {selectedProject?.project_status}
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">Status</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <h3
          style={{
            marginTop: 20,
            fontSize: "1rem",
            zIndex: 100,
            fontWeight: 600,
            color: "black",
            marginBottom: 10,
          }}
        >
          Authorities Involved
        </h3>

        <div
          className="justify-center
        
        columns-3  grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 justify-start"
        >
          {selectedProject?.project_team.map((authority: any) => {
            return (
              <div
                style={{
                  width: 300,
                }}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-end px-4 pt-8"></div>
                <div className="flex flex-col items-center pb-10">
                  <img
                    className="w-16 h-16 mb-3 rounded-full shadow-lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTigrynhD-SE5VcrJXysd0ckkeL1u3WRRmwA&s"
                    alt="Bonnie image"
                  />
                  <h5
                    style={{
                      textAlign: "center",
                      paddingRight: 4,
                      paddingLeft: 4,
                    }}
                    className="mb-1 text-2 font-medium text-gray-900 dark:text-white"
                  >
                    {authority.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {authority.role}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {authority.email}
                  </span>
                  <div className="flex mt-4 md:mt-6">
                    <a
                      style={{
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      href="#"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Website
                    </a>
                    <a
                      style={{
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      href="#"
                      className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <CardHoverEffect /> */}
      </div>
    </div>
  );
};

export default ProjectRevealCardComponent;
