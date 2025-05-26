import { PictureScroller } from "./PictureScroller";

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

interface FeatureSectionProps {
  label: string;
  heading: string;
  description: string;
  features: FeatureItem[];
  screenshots: string[];
  reverse?: boolean; // if true, PictureScroller on left
}

export const FeatureCard: React.FC<FeatureSectionProps> = ({
  label,
  heading,
  description,
  features,
  screenshots,
  reverse = false,
}) => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div
        className={`mx-auto flex flex-col md:flex-row items-center gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text Block */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="text-lg font-mono text-minor uppercase tracking-wider">
            {label}
          </div>
          <h2 className="text-4xl md:text-5xl font-quilon text-primary leading-tight">
            {heading}
          </h2>
          <p className="text-minor font-mono text-lg">{description}</p>
        </div>

        {/* Picture Scroller */}
        <div className="w-full max-w-3xl">
          <PictureScroller screenshots={screenshots} />
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-b divide-y md:divide-y-0 md:divide-x border-gray-200 py-12">
        {features.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start space-x-4 px-2 pt-8 md:pt-0 md:px-8"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm font-mono text-gray-600 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
