"use client";

import React, { Component } from "react";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav className=" z-50 w-full bg-white border-b border-gray-200 dark:bg-#FFFFFF-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a className="flex ms-2 md:me-24" href="../">
              <span
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-gray"
              >
                Dev{" "}
                <span
                  style={{
                    color: "#1EA362",
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  Track
                </span>
              </span>
            </a>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginTop: 10,
              }}
            >
              <Button
                onClick={() => {
                  alert(
                    "No wonder you are smart. But, it is not available yet."
                  );
                }}
                style={{
                  backgroundColor: "black",
                  height: 40,
                  width: 140,
                  color: "white",
                  marginLeft: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  fontWeight: "bold",
                }}
              >
                Teams
              </Button>
            </div>
            <div
              style={{
                marginTop: 10,
              }}
            >
              <Button
                onClick={() => {
                  alert(
                    "No wonder you are smart. But, it is not available yet."
                  );
                }}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  width: 140,
                  color: "black",
                  marginLeft: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  fontWeight: "bold",
                }}
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
