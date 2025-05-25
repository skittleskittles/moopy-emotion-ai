export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t py-8 px-6 md:px-12 text-sm text-gray-600">
      {/* Branding + Description */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        {/* Left: Logo + Brand */}
        <div className="flex items-center md:items-center gap-4 pl-28">
          <img
            src="/assets/logo_wo_text.png"
            alt="Moopy Logo"
            className="h-[100px] w-auto object-contain"
          />
          <span className="text-4xl font-quilon font-bold text-primary">
            Moopy
          </span>
        </div>

        {/* Right: Description + Icons */}
        <div className="flex flex-col items-center md:items-center gap-4 pr-32 text-base">
          <p className="text-minor font-mono font-semibold leading-relaxed">
            AI-powered support that bridges therapy gaps. <br />
            Helping you reflect, stay grounded, and grow between sessions.
          </p>
          <div className="flex gap-6 justify-center md:justify-end">
            <img
              src="/assets/HIPAA.png"
              alt="HIPAA Compliant"
              className="h-10"
            />
            <img src="/assets/GDPR.png" alt="GDPR Compliant" className="h-10" />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-[80%] mx-auto mt-8 text-justify text-gray-600">
        <span className="font-semibold text-sm text-gray-800 mb-2">
          Disclaimer:{" "}
        </span>
        <span className="text-sm leading-relaxed">
          Moopy offers AI-powered emotional support tools designed for use in
          therapeutic settings. The insights generated are intended to assist
          therapists in understanding client patterns and emotions between
          sessions, and should not be interpreted as medical or mental health
          diagnoses. Clients should always rely on qualified professionals for
          clinical guidance. Use of this platform indicates your understanding
          that Moopy is a supplement to—not a substitute for—professional care.
        </span>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Moopy. All rights reserved.
      </div>
    </footer>
  );
};
