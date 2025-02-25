import TermsModal from "@/components/login/TermsModal";
import { ROUTE_PATHS } from "@/routes/Routes";
import { register } from "@/services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const RegisterPage = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreedThroughModal, setAgreedThroughModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isFormValid =
    username.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword &&
    agree;

  const handleRegister = async () => {
    if (!isFormValid) {
      setError(
        "Please complete all fields, confirm your password, and agree to the Terms & Conditions."
      );
      return;
    }

    setIsLoading(true); // disable repeat click
    setError("");

    try {
      const res = await register(username, password);
      if (res.code === 0) {
        navigate(ROUTE_PATHS.LOGIN, { state: { isNewUser: true } });
        console.log("isNewUser: ", true);
      } else {
        setError(res.msg);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] items-center justify-center">
      {/* Banner */}
      <div className="w-full h-[150px] bg-white flex items-center justify-center">
        <h1 className="text-[55px] leading-[76.8px] font-serif text-black tracking-tight">
          Welcome
        </h1>
      </div>

      <h2 className="text-[20px] font-nobile text-[#6D6D6D] mb-6">
        Please sign up with your own username
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-[622px] bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-20 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          {/* Username Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mt-10">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your assword"
                className="w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col mt-10">
            <label className="text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={() => {
                if (agreedThroughModal) {
                  setAgree(!agree);
                } else {
                  setIsModalOpen(true);
                }
              }}
            />
            <label className="text-gray-700">
              I agree to the{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Terms & Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full font-medium py-2 rounded-lg text-white mt-10 ${
              isFormValid && !isLoading
                ? "bg-[#6782B8] hover:bg-[#769fcd]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            Sign up
          </button>
        </form>

        {/* TermsModal Popup */}
        <TermsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAgree={() => {
            setAgreedThroughModal(true);
            setAgree(true);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
