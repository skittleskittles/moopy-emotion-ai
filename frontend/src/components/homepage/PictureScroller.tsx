import { useEffect, useState } from "react";

interface Props {
  screenshots: string[];
}

export const PictureScroller: React.FC<Props> = ({ screenshots }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Reset to first slide if number of screenshots changes
  useEffect(() => {
    setActiveIndex(0);
  }, [screenshots.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % screenshots.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, screenshots.length]);

  const scrollLeft = () => {
    setActiveIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  const scrollRight = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  if (!screenshots.length) return null;

  return (
    <div className="relative group max-w-5xl mx-auto rounded-[30px] overflow-hidden shadow-xl bg-white">
      {/* Background blur glow */}
      <div className="absolute inset-0 z-0 border border-gray-200 bg-gradient-to-br from-[#fef3c7] via-white to-[#fde68a] blur-2xl opacity-60" />

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hidden group-hover:flex"
      >
        ◀
      </button>

      <div
        className="overflow-hidden relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out mt-4"
          style={{
            transform: `translateX(-${
              (100 / screenshots.length) * activeIndex
            }%)`,
            width: `${screenshots.length * 100}%`,
          }}
        >
          {screenshots.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: `${100 / screenshots.length}%` }}
            >
              <img
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="h-[360px] w-auto object-contain rounded-xl shadow-xl border border-gray-200"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hidden group-hover:flex"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2 relative z-10">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === activeIndex ? "bg-secondary" : "bg-gray-300"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};
