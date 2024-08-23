"use client";
import React, { useContext } from "react";
import GoogleMaps from "@/app/components/mapProvider";
import ProjectRevealCardComponent from "@/app/components/projectRevealCard/projectRevealCardComponent";
import ProjectInfoCollapsible from "@/app/components/projectInfoCollapsible/projectInfoCollapsible";
import AppContext from "@/app/context/Context";
import "@/app/globals.css"; 

const MapScreen = () => {
  let { selectedOption } = useContext(AppContext);

  return (
    <div className="mapScreenCustomScrollbar h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <div
          className="h-full w-full flex-row"
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              marginTop: 80,
              height: "90vh",
              display: "flex",
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
