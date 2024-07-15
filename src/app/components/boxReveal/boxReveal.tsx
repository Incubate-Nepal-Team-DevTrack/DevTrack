// import { Button } from "@/components/ui/button";

"use client";

import BoxReveal from "@/components/magicui/box-reveal";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { Button } from "@/components/ui/button";
import TypingAnimation from "@/components/magicui/typing-animation";
import { useRouter } from "next/navigation";

export function BoxRevealDemo() {
  const router = useRouter();

  return (
    <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "5rem",
            fontWeight: "700",
          }}
          className="text-[3.5rem] font-semibold"
        >
          Dev{" "}
          <span
            style={{
              color: "#1EA362",
              fontFamily: "Poppins",
              fontSize: "5rem",
              fontWeight: "700",
            }}
          >
            Track
          </span>
          <span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2
          className="mt-[.2rem] text-[1.5rem] font-semibold 
        
        font-[Poppins]
        "
        >
          A Tracker for <span className="text-[#5046e6]">Eveyone</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div>
          <div className="mt-[1.5rem]">
            <TypingAnimation
              text="DevTrack is an innovative web application designed to bridge the communication gap by bringing transparency and accountability to government projects in Kathmandu Metropolitan City ( KMC). It provides comprehensive details on project budgets , quality , schedules , authorities and usage , ensuring the general public has easy access to vital data . This transparency builds trust between the KMC government and its citizens , reducing corruption and mismanagement while promoting a culture of openness .
 "
              duration={5}
              className="text-[1rem] text-start font-[450] font-[Poppins]"
            />
          </div>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              paddingRight: 2,
              paddingLeft: 2,
              marginTop: 10,
            }}
          >
            <AnimatedSubscribeButton
              initialText={"Subscribe"}
              changeText={"Subscribed"}
              buttonColor={"black"}
              subscribeStatus={false}
              buttonTextColor={"white"}
            />
          </div>
          <div
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              paddingRight: 2,
              paddingLeft: 2,
              marginTop: 10,
            }}
          >
            <Button
              onClick={() => {
                router.push("/explore");
              }}
              style={{
                backgroundColor: "white",
                height: 45,
                width: 200,
                color: "black",
                marginLeft: 10,
                borderColor: "black",
                borderWidth: 1,
                fontWeight: "bold",
              }}
            >
              Explore
            </Button>
          </div>
        </div>

        {/* <Button className="mt-[1.6rem] bg-[#5046e6]">Explore</Button> */}
      </BoxReveal>
    </div>
  );
}
