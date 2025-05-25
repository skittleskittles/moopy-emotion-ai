import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, Github } from "lucide-react";
import shuyuan from "../../assets/team/shuyuan.png";
import yiyan from "../../assets/team/yiyan.png";
import yuhan from "../../assets/team/yuhan.jpeg";
import meier from "../../assets/team/meier.png";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  desc: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: shuyuan,
    name: "Shuyuan Fu",
    position: "Co-founder · Product Manager",
    desc: "Passionate about building empathetic user experiences. Leads product design and frontend dev.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/shuyuan-fu/",
      },
      {
        name: "Github",
        url: "https://github.com/skittleskittles",
      },
    ],
  },
  {
    imageUrl: yiyan,
    name: "Yiyan Kong",
    position: "Co-founder · Technical Lead",
    desc: "Oversees architecture and technical vision. Drives innovation and scalability at Moopy.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/yiyankong/",
      },
      {
        name: "Github",
        url: "https://github.com/K11yann",
      },
    ],
  },
  {
    imageUrl: yuhan,
    name: "Yuhan Liu",
    position: "Backend Engineer",
    desc: "Specializes in API, data security, and scalable infrastructure powering Moopy’s core.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/yhliu62/",
      },
      {
        name: "Github",
        url: "https://github.com/",
      },
    ],
  },
  {
    imageUrl: meier,
    name: "Meier Chen",
    position: "Frontend Engineer",
    desc: "Focuses on seamless UI interactions and mental state assessment to enhance user experience.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/meier-chen/",
      },
      {
        name: "Github",
        url: "https://github.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Github":
        return <Github size="20" />;
    }
  };

  return (
    <section id="team" className="max-w-full mx-11 px-6 pt-24">
      <h2 className="text-4xl text-primary font-quilon font-semibold">
        Meet Our Team
      </h2>

      <p className="mt-4 mb-12 text-xl font-mono text-muted-foreground">
        We are a dedicated team passionate about bridging therapy gaps with
        AI-powered solutions.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, desc, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 shadow-md relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-minor font-mono">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{desc}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
