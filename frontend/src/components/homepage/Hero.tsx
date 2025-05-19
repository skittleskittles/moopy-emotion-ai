import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { ROUTE_PATHS } from "@/routes/Routes";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/models/User";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  return (
    <section className="relative bg-white text-center py-24 md:py-40 overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] bg-gradient-to-tr from-[#6782B8] via-[#ba839f] to-[#FFC6C6] rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 mx-auto px-6">
        <p className="uppercase tracking-widest text-sm text-minor font-semibold mb-4">
          Mental Health Support
        </p>
        <h1 className="text-4xl md:text-6xl font-quilon font-bold text-[#25012b] leading-tight">
          Connect Clients and Therapists.
          <br />
          Stay Close Between Sessions.
        </h1>

        <p className="mt-6 text-lg md:text-xl font-mono text-minor mx-auto leading-relaxed">
          Moopy is a two-sided emotional support platform designed for
          therapists and their clients. <br />
          Clients can chat with AI, track their moods, and reflect on their
          mental state — anytime, 24/7. <br />
          Therapists can view chat history and trends, gaining the context
          needed to support each session.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
          <Button
            className="w-64 font-mono font-bold "
            onClick={() => {
              if (!isLoggedIn()) {
                navigate(ROUTE_PATHS.LOGIN);
              } else if (user?.role == UserRole.Client) {
                navigate(ROUTE_PATHS.CHAT);
              } else if (user?.role == UserRole.Therapist) {
                navigate(ROUTE_PATHS.THERAPIST_DASHBOARD);
              } else {
                navigate(ROUTE_PATHS.ROLE_SELECTION);
              }
            }}
          >
            Get Started
            <ArrowRight className="ml-2 w-6 h-4" />
          </Button>

          <a
            rel="noreferrer noopener"
            href="/#features"
            className={
              buttonVariants({ variant: "outline" }) +
              " w-64 font-mono font-medium"
            }
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};
