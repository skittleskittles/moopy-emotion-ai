import { ROUTE_PATHS } from "@/routes/Routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { connect } from "@/services/api";
import { ConnectType } from "@/models/User";

const ClientConnectPage = () => {
  const [fullName, setFullName] = useState("");
  const [therapistCode, setTherapistCode] = useState("");
  const { user, isLoggedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isFormValid = fullName.trim() !== "" && therapistCode.trim() !== "";

  const handleSubmit = async () => {
    if (!isLoggedIn()) return;
    if (!user || !isFormValid) {
      setError("Please complete all fields.");
      return;
    }

    setIsLoading(true); // disable repeat click
    setError("");

    try {
      const res = await connect(
        user?.userCode,
        therapistCode,
        fullName,
        ConnectType.Client_Connect_Therapist
      );
      if (res.code !== 0) {
        throw new Error("Failed to connect therapist");
      }

      navigate(ROUTE_PATHS.SURVEY);
    } catch (err) {
      setError("Connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="text-center mb-12">
        <h1 className="text-[42px] sm:text-[55px] leading-tight font-serif text-[#0F0F0E] tracking-tight mt-10">
          Connect With Your Therapist
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#A9A6A6] mt-2">
          Please enter your name and the unique therapist code you received.
          <br /> Your information will only be visible to your therapist.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Form */}
      <div className="w-[622px] bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-20 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Full Name Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-lg mb-1">
              Your Full Name
            </label>
            <p className="text-sm text-gray-400 mb-1">
              Visible only to your assigned therapist.
            </p>
            <input
              type="text"
              className="mt-2 w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              required
            />
          </div>

          {/* Therapist Code */}
          <div className="flex flex-col mt-16">
            <label className="text-gray-700 font-medium text-lg mb-1">
              Therapist Code
            </label>
            <p className="text-sm text-gray-400 mb-1">
              This code is provided by your therapist. Please contact them
              directly if you don't have it.
            </p>
            <input
              type="text"
              className="mt-2 w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none pr-10"
              value={therapistCode}
              onChange={(e) => setTherapistCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              required
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`w-[80%] font-medium py-2 rounded-lg text-white ${
                isFormValid && !isLoading
                  ? "bg-[#6782B8] hover:bg-[#769fcd]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientConnectPage;
