import React from "react";
import { CardHoverEffect } from "../card/card";
import { AnimatedTooltipPreview } from "../tooltip/tooltip";
import { ThreeDCardDemo } from "./peopleCards";

const ProjectRevealCardComponent = () => {
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
          src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQOe9cS0ISEvsqLlqrSA2xJ-Moii4LMKHPUmOFKLFF30tOb13m60zTNJuPK_ue0Jias8OU5a6fC8hD021AO6NmA4jCzqo1B74vHfTA_5Q"
          alt="Melamchi Water Supply Project"
        />
      </div>
      <div className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5
          style={{
            color: "black",
            zIndex: 100,
          }}
          className="mb-2 text-3xl font-bold text-gray-900 dark:text-white"
        >
          Melamchi Water Supply Project
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
              Federal Government of Nepal{" "}
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
          The Melamchi Water Supply Project (MWSP) is considered to be the most
          viable long-term alternative to ease the chronic water shortage
          situation within the Kathmandu Valley. The Project is designed to
          divert about 170 MLD of fresh water to Kathmandu Valley from the
          Melamchi River in Sindhupalchowk district. Augmenting this supply by
          adding about a further 170 MLD each from the Yangri and Larke rivers,
          which lie in the upstream proximity of Melamchi are also being
          investigated as future supply sources.
        </p>

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
              <h5 className="mb-1 text-2 font-medium text-gray-900 dark:text-white">
                Minsitry Of Roads and Transport{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Federal Government
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Executive Body
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
                src="https://avatars.githubusercontent.com/u/77845329?v=4"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2 font-medium text-gray-900 dark:text-white">
                Sushil Bhattarai{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Bhattarai Constructions
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Contractor
              </span>
              <div style={{}} className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Phone
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
        </div>

        {/* <CardHoverEffect /> */}
      </div>
    </div>
  );
};

export default ProjectRevealCardComponent;
