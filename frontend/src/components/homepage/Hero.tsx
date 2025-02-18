import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ROUTE_PATHS } from "@/routes/Routes";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#75308a]  to-[#aa7e9d] text-transparent bg-clip-text">
              Moopy
            </span>{" "}
            -
          </h1>{" "}
          {/*for{" "}*/}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#133c47] via-[#8785a2] to-[#6782B8] text-transparent bg-clip-text">
              Your AI Mood Companion
            </span>{" "}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          An AI-powered comprehensive mental health companion counseling with a
          friendly and engaging interactive experience. Through professional
          assessments, an AI conversational chatbot, and a mood tracker, Moopy
          provides personalized support, helping you better understand and
          navigate your mental health journey.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:mr-4 md:w-44"
            onClick={() =>
              navigate(ROUTE_PATHS.LOGIN)
            } /* todo: check login status */
          >
            Get Started
          </Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/skittleskittles/Capstone_Project.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
