import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "Our platform is designed for easy use, with a simple and clear interface for a smooth user experience.",
  },

  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Engage with the community through anonymous inquiries, ensuring complete privacy and confidentiality.",
  },

  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "By leveraging CNN and various AI algorithms, we accurately assess users' emotional states for personalized support.",
  },

  {
    icon: <GiftIcon />,
    title: "Chat with us",
    description:
      "Our AI-powered chat offers friendly and empathetic conversations to help resolve user concerns and provide guidance.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-purple-300 to-[#6782B8] text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit! */}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
