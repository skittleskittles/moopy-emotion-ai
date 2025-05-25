export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="/assets/pilot.png"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
              <p className="text-xl text-muted-foreground mt-4">
                Our platform is dedicated to supporting mental health by helping
                users manage depression, stress, and emotional challenges
                through compassionate conversations and an intelligent, friendly
                chatbot. We provide a safe space for users to express their
                emotions, assess their emotional well-being through thoughtful
                interactions, and offer personalized guidance to foster
                resilience and balance. Additionally, we aim to strengthen
                communication between mental health professionals and users by
                giving therapists access to mood records and user-submitted
                concerns, enabling a deeper understanding and more effective
                support. Our mission is to empower individuals on their path to
                emotional wellness while equipping professionals with meaningful
                tools to enhance care.
              </p>
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
