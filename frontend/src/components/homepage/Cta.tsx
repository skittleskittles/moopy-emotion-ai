import { Button } from "../ui/button";
import { Mail } from "lucide-react";

export const Cta = () => {
  return (
    <section id="contact" className="bg-muted/50 rounded-lg mt-8 py-16">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        {/* Left Content */}
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground text-lg font-mono mt-4 mb-8 lg:mb-0">
            We're happy to connect! Feel free to reach out by email.
          </p>
        </div>

        {/* Button to open mail */}
        <div className="space-y-4 lg:col-start-2">
          <a href="mailto:shuyuanf@uci.edu">
            <Button className="w-full md:w-auto bg-primary flex items-center gap-2">
              Contact
              <Mail className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
