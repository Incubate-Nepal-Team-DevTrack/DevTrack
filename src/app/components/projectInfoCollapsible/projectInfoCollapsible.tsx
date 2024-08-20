"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/tooltip";
import { AnimatedTooltipPreview } from "../tooltip/tooltip";
import AppContext from "@/app/context/Context";
const ProjectInfoCollapsible = () => {
  let {
    count,
    setCount,
    selectedOption,
    setSelectedOption,
    selectedProject,
    setSelectedProject,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex h-12 items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            {selectedProject.project_name}
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.melamchiwater.gov.np/wp-content/uploads/2021/10/Headworks-Diversion-Tunnel-Gate-no-1.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {selectedProject.project_name}
                </h5>
              </a>
              <p
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  fontSize: "0.8rem",
                }}
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
              >
                {selectedProject.project_short_description}
              </p>
              <h3 className="text-sm font-semibold">Authorities Involved</h3>

              <div
                style={{
                  marginTop: 10,
                }}
              >
                {" "}
                <AnimatedTooltipPreview />
              </div>

              <div
                style={{
                  marginTop: 10,
                }}
              >
                <p
                  style={{
                    display: "block",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                  className=" font-normal text-gray-700 dark:text-gray-400"
                >
                  Start Time : {selectedProject.project_start_date}
                </p>
                <p
                  style={{
                    display: "block",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                  className=" font-normal text-gray-700 dark:text-gray-400"
                >
                  Estimated Completion Time: {selectedProject.project_end_date}
                </p>{" "}
                <p
                  style={{
                    display: "block",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                  className=" font-normal text-gray-700 dark:text-gray-400"
                >
                  Constructor: {selectedProject.project_contractor}
                </p>{" "}
                <p
                  style={{
                    display: "block",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                  className=" font-normal text-gray-700 dark:text-gray-400"
                >
                  Authority : {selectedProject.project_authority}
                </p>{" "}
                <p
                  style={{
                    display: "block",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                  className=" font-normal text-gray-700 dark:text-gray-400"
                >
                  Contact Person : Mr. Rajendra Panta
                </p>{" "}
              </div>
              {/* 
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a> */}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProjectInfoCollapsible;
