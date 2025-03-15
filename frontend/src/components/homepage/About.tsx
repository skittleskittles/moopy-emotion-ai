import pilot from "../../assets/pilot.png";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
              <p className="text-xl text-muted-foreground mt-4">
                At our platform, we are committed to providing mental health
                support by assisting users in managing depression, stress, and
                emotional challenges. Through compassionate conversations and a
                friendly chatbot, we create a safe space for users to express
                their feelings. By asking thoughtful questions, we assess their
                emotional well-being and offer tailored advice to help them feel
                better, regain balance, and build emotional resilience. Our goal
                is to empower users on their journey to improved mental health,
                offering both guidance and support whenever they need it.
              </p>
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
