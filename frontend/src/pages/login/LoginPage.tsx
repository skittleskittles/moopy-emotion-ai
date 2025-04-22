import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/models/User";
import { ROUTE_PATHS } from "@/routes/Routes";
import { login } from "@/services/api";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

const LoginPage = (_: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuth();

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid) {
      setError("Please fill in both username and password.");
      return;
    }

    setIsLoading(true); // disable repeat click
    setError("");

    try {
      const res = await login(username, password);
      if (res.code == 0) {
        setAuth(
          res.data.id,
          res.data.username,
          res.data.role,
          res.data.userCode,
          res.data.token
        );
        console.log("isNewUser: ", location.state?.isNewUser);
        if (res.data.role == UserRole.Therapist) {
          navigate(ROUTE_PATHS.THERAPIST_DASHBOARD);
        } else if (res.data.role == UserRole.Client) {
          navigate(ROUTE_PATHS.CHAT);
        } else if (res.data.role == UserRole.Unspecified) {
          navigate(ROUTE_PATHS.ROLE_SELECTION);
        }
      } else if (res.code === 404) {
        setError("User not found. Redirecting to registration...");
        setTimeout(() => navigate(ROUTE_PATHS.REGISTER), 2000);
      } else {
        setError(res.msg);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] items-center justify-center">
      {/* Banner */}
      <div className="w-full h-[150px] bg-white flex items-center justify-center">
        <h1 className="text-[55px] leading-[76.8px] font-serif text-black tracking-tight">
          Welcome Back!
        </h1>
      </div>

      <h2 className="text-[20px] font-nobile text-[#6D6D6D] mb-6">
        Login to your account to continue
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-[622px] bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-20 ">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* username */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* password */}
          <div className="flex flex-col mt-10">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-[10px] focus:ring-2 focus:ring-indigo-200 focus:outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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

          {/* Remember me */}
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label className="text-gray-700">Remember me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full font-medium py-2 rounded-lg text-white mt-10 ${
              isFormValid && !isLoading
                ? "bg-[#6782B8] hover:bg-[#769fcd]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-500 text-center mt-4">
          No account?{" "}
          <span
            className="text-blue-600 cursor-pointer  hover:underline"
            onClick={() => navigate(ROUTE_PATHS.REGISTER)}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
