import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <section id="features" className="px-6 md:px-12 bg-white">
      <FeatureCard
        label="FOR CLIENTS"
        heading="Your Space to Reflect, Feel, and Grow"
        description="Moopy provides a private space to explore your feelings, track your mood, and chat with a supportive AI companion.
                    You can reflect anytime—whether you’re having a tough day or making progress.
                    Your therapist can see these insights to help guide your in-person sessions."
        screenshots={[
          "/assets/product/client_chatbot1.png",
          "/assets/product/client_chatbot2.png",
          "/assets/product/client_survey1.png",
          "/assets/product/client_mood1.png",
          "/assets/product/client_mood2.png",
        ]}
        features={[
          {
            icon: "💬",
            title: "24/7 AI Chat Support",
            desc: "Talk freely to an AI companion that listens without judgment.",
          },
          {
            icon: "📝",
            title: "Mood Tracking",
            desc: "Log daily moods and visualize emotional trends over time.",
          },
          {
            icon: "🧘",
            title: "Self-Reflection Prompts",
            desc: "Answer guided questions to help you better understand yourself.",
          },
          {
            icon: "🔐",
            title: "Trusted Therapist Access",
            desc: "Your reflections are shared only with therapists you know and trust in real life.",
          },
        ]}
      />

      <FeatureCard
        label="FOR THERAPISTS"
        heading="Stay Informed Between Sessions"
        description="Moopy gives you valuable context between in-person sessions. 
        Access mood trends, AI chat summaries, and client check-in reflections—all in one place. 
        Stay connected while maintaining boundaries and control."
        screenshots={[
          "/assets/product/therapist_dashboard0.png",
          "/assets/product/therapist_dashboard1.png",
          "/assets/product/therapist_dashboard_chat1.png",
          "/assets/product/therapist_dashboard_chat2.png",
          "/assets/product/therapist_dashboard_survey1.png",
          "/assets/product/therapist_dashboard_survey2.png",
          "/assets/product/therapist_dashboard_mood1.png",
        ]}
        reverse
        features={[
          {
            icon: "📊",
            title: "Mood & Trend Insights",
            desc: "View longitudinal emotional data and spot patterns or red flags.",
          },
          {
            icon: "📄",
            title: "AI Chat Summaries",
            desc: "Quickly understand what clients are expressing between sessions.",
          },
          {
            icon: "📋",
            title: "Self-Evaluation Records",
            desc: "View clients' SAS & SDS questionnaire results to better understand their current emotional state.",
          },
          {
            icon: "🛡️",
            title: "Verified Access Only",
            desc: "Only licensed therapists can join, and may view records of clients they’ve already worked with offline.",
          },
        ]}
      />
    </section>
  );
};
