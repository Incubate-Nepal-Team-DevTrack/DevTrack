"use client";
import { useContext } from "react";
import NavBar from "@/app/components/navbar/navBar";
import React from "react";
import SideNav from "@/app/components/sideNav";
import { ContextProvider } from "@/app/context/Context";
import Credits from "@/app/components/credits";
import Footer from "@/app/components/footer";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <NavBar />
        </header>
        <div style={{ display: "flex", flex: 1 }}>
          <aside
            style={{
              flex: 0.22,
              backgroundColor: "#f9f9f9",
              height: "100vh",
              position: "relative",
              zIndex: 900,
            }}
          >
            <SideNav />
          </aside>

          <main
            style={{
              flex: 0.78,
              backgroundColor: "#f9f9f9",
              paddingBottom: "2rem", // Add padding to ensure content is not hidden behind the footer
            }}
          >
            {children}
          </main>
        </div>
        <div style={{ position: 'relative' }}>
          <Credits />
        </div>
        <footer
          style={{
            position: "static",
            bottom: 0,
            width: "100%",
            backgroundColor: "#f9f9f9",
            padding: "20px 0",
            zIndex: 1001, // Ensure it is above all other content
          }}
        >
          <Footer />
        </footer>
      </div>
    </ContextProvider>
  );
};

export default Layout;