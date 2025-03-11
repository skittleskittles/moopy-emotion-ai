import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "../components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../components/homepage/mode-toggle";
import { LogoIcon } from "../components/homepage/Icons";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface RouteProps {
  href: string;
  label: string;
}

const homeRoutes: RouteProps[] = [
  {
    href: "#about",
    label: "About Us",
  },
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SURVEY: "/survey",
  SURVEY_QUESTIONS: "/survey/questions",
  CHAT: "/chat",
  PROFILE: "/profile",

  MOOD_TRACKER: "/mood-tracker", // ➤ Mood 日历页面
  MOOD_DAY: "/mood-day/:date", // ➤ 具体日期的 Mood 页面
  YEAR_TRACKER: "/year-tracker",
};

const featureRoutes: RouteProps[] = [
  { href: ROUTE_PATHS.HOME, label: "HomePage" },
  { href: ROUTE_PATHS.SURVEY, label: "Survey" }, // todo: hide in production mode
  { href: ROUTE_PATHS.CHAT, label: "ChatBot" },
  { href: ROUTE_PATHS.MOOD_TRACKER, label: "MoodTracker" },
];

export const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === ROUTE_PATHS.LOGIN ||
    location.pathname === ROUTE_PATHS.REGISTER;
  const isHomePage = location.pathname === ROUTE_PATHS.HOME;
  const routeList = isAuthPage
    ? [{ href: ROUTE_PATHS.HOME, label: "HomePage" }]
    : isHomePage
    ? homeRoutes
    : featureRoutes;

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoIcon />
              Moopy
            </a>
          </NavigationMenuItem>

          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-4 items-center relative">
            {/* <ModeToggle /> */}

            {/* 如果用户未登录，显示 “Login” 按钮 */}
            {!isLoggedIn() ? (
              <button
                onClick={() => navigate(ROUTE_PATHS.LOGIN)}
                className={`px-4 py-2 ${buttonVariants({
                  variant: "default",
                })}`}
              >
                Login
              </button>
            ) : (
              // 用户已登录，显示用户名和下拉菜单
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center ${buttonVariants(
                    {
                      variant: "default",
                    }
                  )}`}
                >
                  <span>
                    {user?.username}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 用户下拉菜单 */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {/* todo: Profile */}
                    {/* <button
                      onClick={() => navigate(ROUTE_PATHS.PROFILE)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button> */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
