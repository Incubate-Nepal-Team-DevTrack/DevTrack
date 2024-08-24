"use client";
import { useContext } from "react";
import NavBar from "@/app/components/navbar/navBar";
import React from "react";
import SideNav from "@/app/components/sideNav";
import { ContextProvider } from "@/app/context/Context";
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <main
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
          }}
        >
          {" "}
          <NavBar />
        </div>
        {/* <div
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            display: "flex",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 0.22,
              backgroundColor: "#f9f9f9",
              height: "100%",
            }}
          >
            <SideNav />
          </div> */}

        <div
          style={{
            width: "100%",
            flex: 0.78,
            backgroundColor: "#f9f9f9",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
        {/* </div> */}
      </main>
    </ContextProvider>
  );
};

export default PageLayout;
