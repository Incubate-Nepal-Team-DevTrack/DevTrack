import Image from "next/image";
import TypingAnimation from "@/components/magicui/typing-animation";
import NavBar from "./components/navbar/navBar";
import BoxReveal from "@/components/magicui/box-reveal";
import { BoxRevealDemo } from "./components/boxReveal/boxReveal";
import { Globe } from "@/components/ui/globe";
import { GlobeDemo } from "./components/globe/globe";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import RetroGrid from "@/components/magicui/retro-grid";
export default function Home() {
  return (
    <main
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          top: 20,
          position: "absolute",

          flex: 1,
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          borderTop: "1px solid #eaeaea",

          alignContent: "center",
        }}
      >
        <div
          style={{
            borderTop: "2px solid #eaeaea",
            width: "70%",
            borderWidth: 2,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <NavBar />
        </div>{" "}
      </div>
      <div
        style={{
          height: "100%",

          width: "100%",
        }}
      >
        {/* <GridPattern /> */}
        <RetroGrid />

        <div
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
            height: "100%",

            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          {" "}
          <div
            className="flex  justify-center "
            style={{
              alignItems: "center",
              // marginBottom: 50,

              // backgroundColor: "red",
              // marginLeft: 40,

              flex: 0.5,
            }}
          >
            {" "}
            <BoxRevealDemo />
          </div>
          <div
            style={{
              flex: 0.4,
              justifyContent: "flex-end",
            }}
          >
            <GlobeDemo />
          </div>
        </div>
      </div>
    </main>
  );
}
