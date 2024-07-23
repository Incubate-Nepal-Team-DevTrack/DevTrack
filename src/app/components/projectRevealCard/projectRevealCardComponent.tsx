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

        <ThreeDCardDemo />
        {/* <CardHoverEffect /> */}
      </div>
    </div>
  );
};

export default ProjectRevealCardComponent;
