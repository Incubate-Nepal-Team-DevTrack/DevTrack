"use client";
import React from "react";
import { AnimatedTooltip } from "../../../components/ui/tooltip";
const people = [
  {
    id: 1,
    name: "Sushil Bhattarai",
    designation: "Main Contractor",
    image: "https://avatars.githubusercontent.com/u/77845329?v=4",
  },
  {
    id: 2,
    name: "Subham Jha",
    designation: "Labour Union Head",
    image:
      "https://media.licdn.com/dms/image/D4E03AQE8lqR0ch05Pg/profile-displayphoto-shrink_200_200/0/1706904162743?e=2147483647&v=beta&t=U_f8Uo4nj5Qrn_l5i2mmPsWnVSgl6PeNmSYLEkWkr30",
  },
  {
    id: 3,
    name: "Preeti Pantha",
    designation: "Feasibility Head",
    image:
      "https://glocalteenhero.com/wp-content/uploads/2023/08/Preeti-Pantha-scaled-e1692253109530.jpeg",
  },
  {
    id: 4,
    name: "Sampada Koirala",
    designation: "Labour",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAkFl8NMIpdM0Jb6gl1K_QeVVQ_n4Ii-vYQ&s",
  },
  {
    id: 5,
    name: "Tushar Shah",
    designation: "Labour",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Sugam Parajuli",
    designation: "Labour",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
  {
    id: 8,
    name: "Prashim Timilsina",
    designation: "Labour",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
  {
    id: 9,
    name: "Kristina Khanal",
    designation: "Labour",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 7,
    name: "Federal Government of Nepal",
    designation: "Executive Body",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTigrynhD-SE5VcrJXysd0ckkeL1u3WRRmwA&s",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center">
      <AnimatedTooltip items={people} />
    </div>
  );
}
