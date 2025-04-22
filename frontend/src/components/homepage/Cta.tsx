import { Button } from "../ui/button";

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Your
            <span className="bg-gradient-to-b from-purple-300 to-[#6782B8] text-transparent bg-clip-text">
            {" "}Appointment
            </span>
            {/*In One Interface*/}
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Welcome to book your Appointment!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto bg-[#6782B8]">
            Book
          </Button>
          {/*<Button variant="outline" className="w-full md:w-auto">*/}
          {/*View all features*/}
          {/*</Button>*/}
        </div>
      </div>
    </section>
  );
};
