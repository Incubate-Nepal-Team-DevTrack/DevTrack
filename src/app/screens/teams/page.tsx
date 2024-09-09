"use client";
import GoogleMaps from "@/app/components/mapProvider";
import NavBar from "@/app/components/navbar/navBar";
import ProjectRevealCardComponent from "@/app/components/projectRevealCard/projectRevealCardComponent";
import SideNav from "@/app/components/sideNav";
import React from "react";
import Layout from "./layout";
import { BentoDemo } from "@/app/components/bentogrid/bentogrid";
import { useContext, useState } from "react";
import AppContext from "@/app/context/Context";
import ProjectInfoCollapsible from "@/app/components/projectInfoCollapsible/projectInfoCollapsible";
import { link } from "fs";
const TeamScreen = () => {
  let { count, setCount, selectedOption, setSelectedOption } =
    useContext(AppContext);

  const teams = [
    {
      timestamp: "23/08/2024 20:53:39",
      name: "Sushil Bhattarai",
      linkedin: "https://www.linkedin.com/in/sushilbhattarai45",
      instagram: "https://www.instagram.com/sushil_bhattarai45",
      portfolio: "",
      description:
        "Sushil Bhattarai, DevTrack's Technical Operations Lead, drove the platform's success through development, research, and strategic collaboration. He secured vital data through high-level meetings and government APIs.",
      photo: "/assets/photos/sushil.jpg",
    },
    {
      timestamp: "22/08/2024 09:03:48",
      name: "Sampada Koirala",
      linkedin:
        "https://www.linkedin.com/in/sampada-koirala-5b43b2318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram:
        "https://www.instagram.com/sampadaaa.k?igsh=MWx4ODJsc2t5YzJhYQ==",
      portfolio: "",
      description:
        "Sampada Koirala, a high school graduate from KMC, Bagbazar, is passionate about economics and committed to learning. As a researcher for DevTrack, she has led efforts in identifying key issues and advancing transparency in government-led development projects.",

      photo: "/assets/photos/sampada.jpeg",
    },
    {
      timestamp: "22/08/2024 09:33:39",
      name: "Sugam Parajuli",
      linkedin: "https://www.linkedin.com/in/sugam-parajuli-3657a227a/",
      instagram: "https://www.instagram.com/sugamparajulii/",
      portfolio: "",
      description:
        "Sugam Parajuli is a versatile DevTrack member with skills in math, psychology, computer science, and AI. He managed initial outreach with government officials, crafted comprehensive project documentation, and ensured effective communication with stakeholders.",
      photo: "/assets/photos/sugam.jpg",
    },
    {
      timestamp: "22/08/2024 21:31:37",
      name: "Preeti Pantha",
      linkedin: "https://www.linkedin.com/in/preeti-pantha-132a98279/",
      instagram: "https://www.instagram.com/pantha.preeti/",
      portfolio: "",
      description:
        "Preeti Pantha is a DevTrack researcher focused on social justice. Her work highlighted transparency and accessibility in governmental processes, ensuring accurate data representation to empower civic engagement in Kathmandu Metropolitan City.",
      photo: "/assets/photos/preeti.jpeg",
    },
    {
      timestamp: "22/08/2024 23:05:17",
      name: "Tushar Shah",
      linkedin: "https://www.linkedin.com/in/tushar-shah-44a16b1b1/",
      instagram: "https://www.instagram.com/shahhhhh09/",
      portfolio: "",
      description:
        "Tushar Sha is a researcher at DevTrack. He was instrumental in data collection and outreach efforts, ensuring a comprehensive approach to project success.",
      photo: "/assets/photos/tushar.jpg",
    },

    {
      timestamp: "23/08/2024 21:04:29",
      name: "Kristina Khanal",
      linkedin: "https://www.linkedin.com/in/prashimpy",
      instagram: "https://instagram.com/prashim.py",
      portfolio: "https://prashim.com.np",
      description:
        "Kristina Khanal refined ideas with mentors, coordinated tasks among the team, and finalized collaborations with KMC. He also contributed to computation, coding, and managing the GitHub repository.",
      photo: "/assets/photos/kristy.png",
    },
  ];

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
            className="
          mt-[100px]
          h-full gap-[4rem] grid-cols-2 flex justify-center"
          >
            <div className=" w-[38rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="   flex flex-col items-center pb-10">
                <div
                  style={{
                    width: "350px",
                    height: "350px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="h-[16rem] w-full"
                >
                  <img
                    className="w-full h-full mb-3  shadow-lg"
                    src="/assets/photos/subham.jpg"
                    alt="Bonnie image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>

                <h5
                  className="
                font-bold text-2xl text-gray-900 dark:text-white text-center
                mb-1 mt-[0.8rem] text-xl  text-gray-900 dark:text-white"
                >
                  Shubham Jha
                </h5>
                <span
                  className="text-sm  
                font-bold text-gray-500 dark:text-gray-400 text-center
                text-gray-500 dark:text-gray-400"
                >
                  Mentor
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 px-[20px] pt-[4px] justify-center text-justify flex">
                  Shubham’s always been passionate about bringing tech and policy together and that’s what he did at DevTrack. He ideated this product and led the entire team to visualize what the development trajectory of Nepal would look like. As a founder, he’s helped the team build powerful connections, learn modern tech, understand bureaucracy and build something first of its kind in Nepal.
                </span>
                <div className="flex mt-2 md:mt-2 justify-between  ">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    LinkedIn{" "}
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Instagram{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className=" w-[24rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="   flex flex-col items-center pb-10">
              <div
                  style={{
                    width: "350px",
                    height: "350px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="h-[16rem] w-full"
                >
                  <img
                    className="w-full h-full mb-3  shadow-lg"
                    src="/assets/photos/Prashim_Timsina_Right.JPG"
                    alt="Bonnie image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>

                <h5
                  className="
                font-bold text-2xl text-gray-900 dark:text-white text-center
                mb-1 mt-[0.8rem] text-xl  text-gray-900 dark:text-white"
                >
                  Prashim Timsina
                </h5>
                <span
                  className="text-sm  
                font-bold text-gray-500 dark:text-gray-400 text-center
                text-gray-500 dark:text-gray-400"
                >
                  Peer Mentor
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 px-[20px] pt-[4px] justify-center text-justify flex">
                  Prashim Timsina refined ideas with mentors, coordinated tasks
                  among the team, and finalized collaborations with KMC. He also
                  contributed to computation, coding, and managing the GitHub
                  repository.
                </span>
                <div className="flex mt-2 md:mt-2 justify-between  ">
                  <a
                    href="https://www.linkedin.com/in/prashimpy"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    LinkedIn{" "}
                  </a>
                  <a
                    href="https://instagram.com/prashim.py"
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Instagram{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full grid grid-cols-1 md:grid-cols-3 mt-10 gap-4 justify-items-center">
            {teams.map((team) => {
              return (
                <div className=" w-[38rem] max-w-sm bg-black flex flex-row border border-gray-200 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="   flex flex-col  items-center pb-10 bg-white">
                  <div
                  style={{
                    width: "350px",
                    height: "350px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="h-[16rem] w-full"
                >
                  <img
                    className="w-full h-full mb-3  shadow-lg"
                    src={team.photo}
                    alt="Bonnie image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>

                    <h5
                      className="
                    font-bold text-2xl text-gray-900 dark:text-white text-center
                    mb-1 mt-[0.8rem] text-xl  text-gray-900 dark:text-white"
                    >
                      {team.name}
                    </h5>
                    <span
                      className="text-sm  
                    font-bold text-gray-500 dark:text-gray-400 text-center
                    text-gray-500 dark:text-gray-400"
                    >
                      Mentee
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 px-[20px] pt-[4px] justify-center text-justify flex">
                      {team.description}
                    </span>
                    <div className="flex mt-4 md:mt-4 justify-between  ">
                      <a
                        href={team.linkedin}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        LinkedIn{" "}
                      </a>
                      <a
                        href={team.instagram}
                        className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Instagram{" "}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamScreen;
