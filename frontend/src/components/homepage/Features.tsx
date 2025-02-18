import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../../assets/growth.png";
import image3 from "../../assets/reflecting.png";
import image4 from "../../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Professional Assessments",
    description:
      "Gain insights into your mental well-being with clinically-backed assessments. Moopy integrates professional mental health evaluations to help you better understand your emotional state and track your progress over time.",
    image: image4,
  },
  {
    title: "AI-Powered ChatBot",
    description:
      "Need someone to talk to? Moopy’s AI-powered chatbot provides a safe, judgment-free space where you can express your thoughts, get emotional support, and receive helpful insights tailored to your feelings.",
    image: image3,
  },
  {
    title: "Mood Tracker",
    description:
      "Stay in tune with your emotions. Our intuitive mood tracker allows you to log your daily feelings, identify patterns, and gain deeper self-awareness, empowering you to take charge of your mental health.",
    image: image,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

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
