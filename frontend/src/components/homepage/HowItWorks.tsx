import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    //icon: <MedalIcon />,
    icon: <img src="https://th.bing.com/th/id/OIP.WwXHao8bmSDkY7WRv5eECgHaHa?rs=1&pid=ImgDetMain" alt="medal" style={{ width: 70, height: 70 }} />,
    title: "Psychological Assessment",
    description:
      "Gain insights into your mental well-being through clinically validated questionnaires designed to evaluate emotional and psychological states for personalized care.",
  },

  {
    //icon: <MapIcon />,
    icon: <img src="https://movebettergwent.nhs.wales/wp-content/uploads/2021/09/Move-better-step-2.png" alt="medal" style={{ width: 70, height: 70 }} />,
    title: "Community",
    description:
      "Connect with mental health professionals through real-time chat for emotional support, expert guidance, and timely interventions.",
  },

  {
    //icon: <PlaneIcon />,
    icon: <img src="https://movebettergwent.nhs.wales/wp-content/uploads/2021/09/Move-better-step-3.png" alt="medal" style={{ width: 70, height: 70 }} />,
    title: "Records",
    description:
      "Automatically track and store assessment results and communication history, enabling comprehensive monitoring of your mental health progress over time.",
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
