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
              AI
            </span>{" "}
            for
          </h1>{" "}
          {/*for{" "}*/}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#133c47] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Mental Health
            </span>{" "}
            Assistant
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Comprehensive mental health counseling with a friendly and engaging interactive experience.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-1/3"
            onClick={() => navigate(ROUTE_PATHS.LOGIN)} /* todo: check login status */
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
