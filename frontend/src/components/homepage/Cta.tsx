import { Button } from "../ui/button";
import { Mail } from "lucide-react";

export const Cta = () => {
  return (
    <section
      id="contact"
      className="bg-muted/50 rounded-lg mt-8 py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        {/* Left Content */}
        <div className="flex flex-col gap-4 md:gap-2">
          <h2 className="text-3xl md:text-4xl font-bold font-quilon">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg font-mono">
            We're happy to connect! Feel free to reach out by email.
          </p>
        </div>

        {/* Right: Contact Button */}
        <div className="pr-6 md:pr-12">
          <a href="mailto:shuyuanf@uci.edu">
            <Button className="bg-primary flex items-center gap-2 px-6 py-2 text-sm md:text-base font-mono">
              Contact
              <Mail className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
