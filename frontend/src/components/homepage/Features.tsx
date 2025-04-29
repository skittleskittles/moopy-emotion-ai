import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import image from "../../assets/growth.png";
// import image3 from "../../assets/reflecting.png";
// import image4 from "../../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Professional Assessments",
    description:
      "Gain valuable insights into your mental well-being with clinically validated assessments. Moopy integrates professional mental health evaluations, providing you with a deeper understanding of your emotional state and enabling you to track your progress over time. This allows healthcare professionals to easily monitor and assess patient conditions.",
    //image: image4,
    image: "https://media.istockphoto.com/photos/assessment-and-analysis-by-professional-auditing-consultant-concept-picture-id1162629597?k=6&m=1162629597&s=170667a&w=0&h=rJGFR0BrEOpnsZzl3BqnLPcT0iK_fsj7M9v-6FWIiqI=",
  },
  {
    title: "AI-Powered ChatBot",
    description:
      "Need someone to talk to? Moopy’s AI-powered chatbot provides a safe, judgment-free space where you can express your thoughts, get emotional support, and receive helpful insights tailored to your feelings.",
    //image: image3,
    image: "https://www.cioinsight.com/wp-content/uploads/2022/08/Chatbots-in-Machine-Learning-2048x1365.jpeg",
  },
  {
    title: "Mood Tracker",
    description:
      "Stay in tune with your emotions. Our intuitive mood tracker allows you to log your daily feelings, identify patterns, and gain deeper self-awareness, empowering you to take charge of your mental health.",
    //image: image,
    image: "https://i2.wp.com/101planners.com/wp-content/uploads/2020/03/Mood-Tracker-13-1187x1536.jpeg",
  },
  {
    title: "Real doctor",
    description:
      "Your mental health professional will provide online support, addressing your concerns and circumstances, offering emotional reassurance, and delivering timely treatment.",
    image: "https://th.bing.com/th/id/OIP.UEF6BYjO44FOGtSMSJnv_AHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "Online Reservation",
    description:
      "Users can schedule appointments with doctors online, and doctors can access their calendar to view, modify, or update appointment details.",
    image: "https://www.singhead.com/uploads/20221031/2022103109164362072333_800%C3%97607.jpg",
  },

];

// const featureList: string[] = [
//   "Dark/Light theme",
//   "Reviews",
//   "Features",
//   "Pricing",
//   "Contact form",
//   "Our team",
//   "Responsive design",
//   "Newsletter",
//   "Minimalist",
// ];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many Great{" "}
        <span className="bg-gradient-to-b from-purple-300 to-[#6782B8] text-transparent bg-clip-text">
          Features
        </span>
      </h2>

      {/* <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
