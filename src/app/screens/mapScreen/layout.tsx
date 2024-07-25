"use client";
import { useContext } from "react";
import NavBar from "@/app/components/navbar/navBar";
import React from "react";
import SideNav from "@/app/components/sideNav";
import { ContextProvider } from "@/app/context/Context";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <main>
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
        <div
          style={{
            flex: 0.22,
          }}
        >
          <SideNav />
        </div>
        <main>{children}</main>
      </main>
    </ContextProvider>
  );
};

export default Layout;
