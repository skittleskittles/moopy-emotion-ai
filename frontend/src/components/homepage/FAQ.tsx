import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

interface FAQProps {
  question: string;
  answer: string;
}

const groupedFaqs: { [category: string]: FAQProps[] } = {
  General: [
    {
      question: "How does Moopy work?",
      answer:
        "Moopy is an AI-powered emotional support platform that lets clients chat with a compassionate AI chatbot 24/7. It helps users log their mood, complete self-assessments, and share insights with their therapists between sessions.",
    },
    {
      question: "Is Moopy free to use?",
      answer:
        "Moopy offers a free version for individual users. Therapists or institutions may subscribe to access the full dashboard and analytics features.",
    },
    {
      question: "What platforms is Moopy available on?",
      answer:
        "Moopy is currently accessible through web browsers, with mobile support coming soon.",
    },
    {
      question: "What makes Moopy different from other mental health apps?",
      answer:
        "Moopy is designed for both clients and therapists. It bridges the gap between therapy sessions with mood tracking, chatbot conversation logs, and clinically relevant summaries that therapists can access.",
    },
    {
      question: "Who created Moopy and why?",
      answer:
        "Moopy was developed by a team of engineers and mental health advocates to support clients emotionally between therapy sessions, while helping professionals stay informed and provide better care.",
    },
  ],
  Clients: [
    {
      question: "What is Moopy and how can it help me?",
      answer:
        "Moopy is your AI companion for emotional support. You can talk to it about your day, record your feelings, and take mood assessments. Your therapist can view trends to help support you better.",
    },
    {
      question: "Is Moopy a replacement for therapy?",
      answer:
        "No. Moopy is a support tool, not a replacement for licensed therapy. It's best used alongside a therapist for more consistent care.",
    },
    {
      question: "Can I talk to Moopy anytime?",
      answer:
        "Yes! Moopy is available 24/7, so you can share how you’re feeling anytime you need to.",
    },
    {
      question: "Is my data safe and private?",
      answer:
        "Absolutely. We prioritize your privacy and follow strict data protection practices. Only you and your authorized therapist can view your emotional data.",
    },
    {
      question: "Can my therapist see my chats with Moopy?",
      answer:
        "Yes, but only if you've granted permission. Therapists can view chat summaries and mood trends through their secure dashboard.",
    },
    {
      question: "Do I need an account to use Moopy?",
      answer:
        "Yes, creating an account ensures your mood history and chat data are securely saved and accessible across devices.",
    },
    {
      question: "How does Moopy track my mood?",
      answer:
        "Moopy uses a combination of daily mood logs, check-ins, and self-assessment questionnaires to track how you’re doing over time.",
    },
    {
      question: "What if I feel worse after using Moopy?",
      answer:
        "If you feel worse, please reach out to a licensed mental health professional. Moopy is not intended for crisis support. If you're in danger, contact emergency services or a local crisis line.",
    },
  ],
  Therapists: [
    {
      question: "How can Moopy support my therapy practice?",
      answer:
        "Moopy keeps you connected with your clients between sessions by offering insights into their mood trends, AI-chat summaries, and survey scores, all in one secure dashboard.",
    },
    {
      question: "Can I monitor my client’s emotional changes between sessions?",
      answer:
        "Yes. Therapists can track mood logs, self-assessment trends, and receive insights from the AI chatbot to better prepare for upcoming sessions.",
    },
    {
      question: "What kind of insights does Moopy provide to therapists?",
      answer:
        "Moopy summarizes client emotional states, shows trends over time, and flags concerning patterns or keywords that might need attention.",
    },
    {
      question: "How do I access my client’s chat and mood logs?",
      answer:
        "Once your client links their Moopy account to yours, you can log into the Therapist Dashboard to view their data securely.",
    },
    {
      question: "Is Moopy HIPAA-compliant or clinically reviewed?",
      answer:
        "Moopy is built with clinical oversight and follows best practices for data privacy and integrity. HIPAA compliance support is under development for institutional partnerships.",
    },
    {
      question: "Can I invite my clients to join Moopy?",
      answer:
        "Yes, you can invite clients by sharing your therapist code or onboarding link. Once they sign up, you’ll be able to view their insights.",
    },
    {
      question: "What if my client shares something critical with Moopy?",
      answer:
        "Moopy uses keyword flagging to alert therapists to potentially concerning topics. However, it is not a crisis tool—clients in danger should be referred to emergency services immediately.",
    },
  ],
};

export const FAQ = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("General");

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <section id="faq" className="bg-white py-16 px-4 my-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Title */}
        <div className="md:col-span-1">
          <h2 className="text-4xl md:text-5xl font-quilon text-primary leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Right: Accordion FAQ List */}
        <div className="md:col-span-2 space-y-4">
          {Object.entries(groupedFaqs).map(([category, faqs]) => (
            <div key={category} className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer py-3 px-4 shadow-md bg-gradient-to-r from-[#FFC6C6]/30 via-[#ba839f]/20 to-[#6782B8]/30 rounded-lg"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="text-xl font-mono font-semibold text-minor">
                  {category}
                </h3>
                <span className="text-2xl">
                  {openCategory === category ? "−" : "+"}
                </span>
              </div>
              {openCategory === category && (
                <div className="mt-4 space-y-4 mx-6">
                  {faqs.map((faq, index) => (
                    <Disclosure key={index}>
                      {({ open }) => (
                        <div
                          className={`rounded-xl px-6 py-4 transition-all duration-300 ease-in-out ${
                            open ? "bg-gray-100 shadow-md" : "bg-gray-100"
                          }`}
                        >
                          <DisclosureButton className="flex justify-between items-center w-full text-left">
                            <p className="text-lg font-medium text-gray-800">
                              {faq.question}
                            </p>
                            <span
                              className={`text-xl transition-transform duration-300 ${
                                open ? "rotate-45" : ""
                              }`}
                            >
                              {open ? "−" : "+"}
                            </span>
                          </DisclosureButton>
                          <DisclosurePanel
                            className={`transition-all duration-300 ease-in-out overflow-hidden text-base text-gray-600 font-mono ${
                              open
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {faq.answer}
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
