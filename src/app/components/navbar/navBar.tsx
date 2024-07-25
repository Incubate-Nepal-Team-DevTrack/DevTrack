"use client";

import React, { Component } from "react";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import AppContext from "@/app/context/Context";
export default function NavBar() {
  const { count, setCount, selectedOption, setSelectedOption } =
    React.useContext(AppContext);
  console.log(count);
  const [selected, setSelected] = React.useState<string | null>("detail");
  async function handleSelectChange(value: string) {
    setSelectedOption(value);
  }
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
                  alert("No wonder you are smart, but it is not available.");
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
                  alert("No wonder you are smart, but it is not available.");
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
            <div
              style={{
                marginTop: 10,
              }}
            >
              <Button
                style={{
                  backgroundColor: "white",
                  height: 40,
                  width: 140,
                  color: "black",
                  marginLeft: 10,
                  // borderColor: "black",
                  // borderWidth: 1,
                  fontWeight: "bold",
                }}
              >
                <label className="inline-flex items-center cursor-pointer justify-center">
                  <input
                    onChange={() => {
                      if (selected === "detail") {
                        setSelected("map");
                        handleSelectChange("map");
                      } else {
                        setSelected("detail");
                        handleSelectChange("detail");
                      }
                    }}
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Map
                  </span>
                </label>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
