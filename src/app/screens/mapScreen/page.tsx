"use client";
import GoogleMaps from "@/app/components/mapProvider";
import NavBar from "@/app/components/navbar/navBar";
import ProjectRevealCardComponent from "@/app/components/projectRevealCard/projectRevealCardComponent";
import SideNav from "@/app/components/sideNav";
import React from "react";
import Layout from "./layout";

import { useContext, useState } from "react";
import AppContext from "@/app/context/Context";
import ProjectInfoCollapsible from "@/app/components/projectInfoCollapsible/projectInfoCollapsible";
const MapScreen = () => {
  let { count, setCount, selectedOption, setSelectedOption } =
    useContext(AppContext);
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <div
          className="h-full w-ful flex-row"
          style={{
            height: "100%",
          }}
        >
          <div
            style={{
              marginTop: 80,
              height: "90vh",

              display: "flex",

              // backgroundColor: "blue",
            }}
          >
            {selectedOption === "map" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                }}
              >
                <GoogleMaps />
                <div
                  style={{
                    position: "fixed",
                    flex: 1,
                    right: 0,
                    backgroundColor: "white",
                    display: "flex",
                    // width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: "1px solid #eaeaea",
                    alignContent: "center",
                    zIndex: 13330,
                  }}
                >
                  <ProjectInfoCollapsible />
                </div>
              </div>
            ) : (
              <ProjectRevealCardComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
