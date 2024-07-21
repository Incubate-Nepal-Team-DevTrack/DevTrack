"use client";
import GoogleMaps from "@/app/components/mapProvider";
import NavBar from "@/app/components/navbar/navBar";
import SideNav from "@/app/components/sideNav";
import React from "react";

const MapScreen = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <NavBar />
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
              flex: 0.25,
            }}
          >
            {" "}
            <SideNav />
          </div>

          <div
            style={{
              flex: 0.85,
              height: "100vh",
              display: "flex",

              // backgroundColor: "blue",
            }}
          >
            {/* <GoogleMaps /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
