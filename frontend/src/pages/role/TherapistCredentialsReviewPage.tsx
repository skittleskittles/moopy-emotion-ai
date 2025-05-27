const TherapistCredentialsReviewPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/assets/check-mark.png"
        alt="Checkmark"
        className="w-1/6 h-1/6  my-10"
      />

      <div className="w-full h-40 bg-white flex items-center justify-center">
        <h1 className="text-6xl font-newsreader tracking-tight">
          Thank you for submitting your credentials.
        </h1>
      </div>

      <p className="mx-4 text-lg font-mono text-[#A9A6A6] mb-[10%]">
        Our team is reviewing your information. This usually takes 24–48 hours.
      </p>
    </div>
  );
};

export default TherapistCredentialsReviewPage;
