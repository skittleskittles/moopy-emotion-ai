import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How mush does it cost?",
    answer: "Yes, it is completely free of charge.",
    value: "item-1",
  },
  {
    question: "What is AI Medical Assistant?",
    answer:
      "At our platform, we are committed to providing mental health support by assisting users in managing depression, stress, and emotional challenges. Through compassionate conversations and a friendly chatbox, we create a safe space for users to express their feelings. By asking thoughtful questions, we assess their emotional well-being and offer tailored advice to help them feel better, regain balance, and build emotional resilience. Our goal is to empower users on their journey to improved mental health, offering both guidance and support whenever they need it.",
    value: "item-2",
  },
  {
    question:
      "Who will be helping me?",
    answer:
      "After you sign up, we will prove a short mental test and it will give us basic info. Then, we will match your question with mental haelth data to help you find the resulr. You can ask any questions in chat with me.",
    value: "item-3",
  },
  {
    question: "Can I stay anonymous?",
    answer: "Yes, users are free to choose any name they prefer. Additionally, all personal information will remain anonymous to ensure privacy.",
    value: "item-4",
  },
  {
    question:
      "How can I get started with AI Medical Assistant?",
    answer:
      "On the homepage, click on 'Get Started' to begin.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-purple-300 to-purple-700 text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-purple-500 transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
