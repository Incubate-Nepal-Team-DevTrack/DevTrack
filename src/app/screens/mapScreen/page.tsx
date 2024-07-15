import NavBar from "@/app/components/navbar/navBar";
import SideNav from "@/app/components/sideNav";
import React from "react";
import mapboxgl from "mapbox-gl";

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
            backgroundColor: "red",
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
              display: "flex",

              backgroundColor: "blue",
            }}
          >
            {" "}
            <h1>Map Screen</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
