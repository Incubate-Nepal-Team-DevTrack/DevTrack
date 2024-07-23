"use client";
import GoogleMaps from "@/app/components/mapProvider";
import NavBar from "@/app/components/navbar/navBar";
import ProjectRevealCardComponent from "@/app/components/projectRevealCard/projectRevealCardComponent";
import SideNav from "@/app/components/sideNav";
import React from "react";

const MapScreen = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <div
          style={{
            position: "fixed",
            flex: 1,
            top: 0,
            zIndex: 100,
            width: "100%",
          }}
        >
          {" "}
          <NavBar />
        </div>

        <div
          className="h-full w-ful flex-row"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              flex: 0.22,
            }}
          >
            {" "}
            <SideNav />
          </div>

          <div
            style={{
              flex: 0.76,
              marginLeft: 10,
              marginTop: 80,
              height: "100vh",
              display: "flex",

              // backgroundColor: "blue",
            }}
          >
            {/* <ProjectRevealCardComponent /> */}

            <GoogleMaps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
