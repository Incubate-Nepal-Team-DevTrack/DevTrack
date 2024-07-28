import React from "react";
import { CardHoverEffect } from "../card/card";
import { AnimatedTooltipPreview } from "../tooltip/tooltip";
import { PeopleCard } from "./peopleCards";

const ProjectRevealCardComponent = () => {
  return (
    <div
      className="flex flex-col w-full"
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <div
        className="w-full"
        style={{
          marginTop: 10,
          width: "100%",
        }}
      >
        <img
          className="w-full"
          style={{
            height: 300,
            borderRadius: "0.375rem",
          }}
          src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQOe9cS0ISEvsqLlqrSA2xJ-Moii4LMKHPUmOFKLFF30tOb13m60zTNJuPK_ue0Jias8OU5a6fC8hD021AO6NmA4jCzqo1B74vHfTA_5Q"
          alt="Melamchi Water Supply Project"
        />
      </div>
      <div className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5
          style={{
            color: "black",
            zIndex: 100,
          }}
          className="mb-2 text-3xl font-bold text-gray-900 dark:text-white"
        >
          Melamchi Water Supply Project
        </h5>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "grey",
                zIndex: 100,
                fontWeight: 600,
              }}
            >
              Federal Government of Nepal{" "}
            </p>
          </div>
          <div className="flex flex-col justify-center items-right">
            {" "}
            <AnimatedTooltipPreview />
          </div>
        </div>

        <p
          style={{
            fontSize: "1rem",
            zIndex: 100,
            marginTop: 20,
          }}
          className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400"
        >
          The Melamchi Water Supply Project (MWSP) is considered to be the most
          viable long-term alternative to ease the chronic water shortage
          situation within the Kathmandu Valley. The Project is designed to
          divert about 170 MLD of fresh water to Kathmandu Valley from the
          Melamchi River in Sindhupalchowk district. Augmenting this supply by
          adding about a further 170 MLD each from the Yangri and Larke rivers,
          which lie in the upstream proximity of Melamchi are also being
          investigated as future supply sources.
        </p>

        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <ul
            className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li className="w-full">
              <button
                id="stats-tab"
                data-tabs-target="#stats"
                type="button"
                role="tab"
                aria-controls="stats"
                aria-selected="true"
                className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Statistics of the Project
              </button>
            </li>
          </ul>
          <div
            id="fullWidthTabContent"
            className="border-t border-gray-200 dark:border-gray-600 "
          >
            <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">
                    9th June 2015
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Starting Date{" "}
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">
                    20th Aug 2018
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Completion Date
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold"> 1 Kharba</dt>
                  <dd className="text-gray-500 dark:text-gray-400">Budget</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-extrabold">90</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Labours Working
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt style={{}} className="mb-2 text-2xl font-bold">
                    Pappu Construction
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Contractor
                  </dd>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-2xl font-bold">In Progress</dt>
                  <dd className="text-gray-500 dark:text-gray-400">Status</dd>
                </div>
              </dl>
            </div>
            <div
              className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                We invest in the world’s potential
              </h2>
              <ul
                role="list"
                className="space-y-4 text-gray-500 dark:text-gray-400"
              >
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">
                    Dynamic reports and dashboards
                  </span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">Templates for everyone</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">Development workflow</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">
                    Limitless business automation
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="hidden p-4 bg-white rounded-lg dark:bg-gray-800"
              id="faq"
              role="tabpanel"
              aria-labelledby="faq-tab"
            >
              <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                data-inactive-classes="text-gray-500 dark:text-gray-400"
              >
                <h2 id="accordion-flush-heading-1">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-flush-body-1"
                  >
                    <span>What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-1"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-1"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-2"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-2"
                  >
                    <span>Is there a Figma file available?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-2"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-2"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is first conceptualized and designed using the
                      Figma software so everything you see in the library has a
                      design equivalent in our Figma file.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out the{" "}
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Figma design system
                      </a>{" "}
                      based on the utility classes from Tailwind CSS and
                      components from Flowbite.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-3"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-3"
                  >
                    <span>
                      What are the differences between Flowbite and Tailwind UI?
                    </span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-3"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-3"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      The main difference is that the core components from
                      Flowbite are open source under the MIT license, whereas
                      Tailwind UI is a paid product. Another difference is that
                      Flowbite relies on smaller and standalone components,
                      whereas Tailwind UI offers sections of pages.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      However, we actually recommend using both Flowbite,
                      Flowbite Pro, and even Tailwind UI as there is no
                      technical reason stopping you from using the best of two
                      worlds.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Learn more about these technologies:
                    </p>
                    <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                      <li>
                        <a
                          href="https://flowbite.com/pro/"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Flowbite Pro
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://tailwindui.com/"
                          rel="nofollow"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Tailwind UI
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3
          style={{
            marginTop: 20,
            fontSize: "1rem",
            zIndex: 100,
            fontWeight: 600,
            color: "black",
            marginBottom: 10,
          }}
        >
          Authorities Involved
        </h3>

        <div
          className="justify-center
        
        columns-3  grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 justify-start"
        >
          <div
            style={{
              width: 300,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end px-4 pt-8"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-16 h-16 mb-3 rounded-full shadow-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTigrynhD-SE5VcrJXysd0ckkeL1u3WRRmwA&s"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2 font-medium text-gray-900 dark:text-white">
                Minsitry Of Roads and Transport{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Federal Government
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Executive Body
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Website
                </a>
                <a
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              width: 300,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end px-4 pt-8"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-16 h-16 mb-3 rounded-full shadow-lg"
                src="https://avatars.githubusercontent.com/u/77845329?v=4"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2 font-medium text-gray-900 dark:text-white">
                Sushil Bhattarai{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Bhattarai Constructions
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Contractor
              </span>
              <div style={{}} className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Phone
                </a>
                <a
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              width: 300,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end px-4 pt-8"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-16 h-16 mb-3 rounded-full shadow-lg"
                src="data:image/jpeg;base64,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"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2 font-medium text-gray-900 dark:text-white">
                Subham Jha{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Labour Union
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Head
              </span>
              <div style={{}} className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Phone
                </a>
                <a
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <CardHoverEffect /> */}
      </div>
    </div>
  );
};

export default ProjectRevealCardComponent;
