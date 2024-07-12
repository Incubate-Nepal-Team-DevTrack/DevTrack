import Image from "next/image";
import TypingAnimation from "@/components/magicui/typing-animation";
import SideNav from "../components/sideNav";

export default function Home() {
  return (
    <main>
      <SideNav />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4"></div>
        </div>
      </div>
    </main>
  );
}
