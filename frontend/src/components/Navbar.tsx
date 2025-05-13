import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CopyButton } from "./navbar/CopyButton";

import { UserRole } from "@/models/User";

import { buttonVariants } from "../components/ui/button";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import moopy from "../assets/moopy.png";
import logo from "../assets/logo_wo_text.png";

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

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  ROLE_SELECTION: "/role/select",
  CLIENT_CONNECT_THERAPIST: "/client/connect",
  THERAPIST_CREDENTIALS: "/therapist/credentials",
  THERAPIST_DASHBOARD: "/therapist/dashboard",
  THERAPIST_DASHBOARD_CLIENT_DETIAL: "/therapist/dashboard/client/detail",

  SURVEY: "/survey",
  SURVEY_QUESTIONS: "/survey/questions",
  CHAT: "/chat",
  PROFILE: "/profile",

  MOOD_TRACKER: "/mood-tracker", // ➤ Mood 日历页面
  MOOD_DAY: "/mood-day/:date", // ➤ 具体日期的 Mood 页面
  YEAR_TRACKER: "/year-tracker",
};

const clientRoutes: RouteProps[] = [
  { href: ROUTE_PATHS.HOME, label: "HomePage" },
  { href: ROUTE_PATHS.SURVEY, label: "Survey" },
  { href: ROUTE_PATHS.CHAT, label: "ChatBot" },
  { href: ROUTE_PATHS.MOOD_TRACKER, label: "MoodTracker" },
];

const therapistRoutes: RouteProps[] = [
  { href: ROUTE_PATHS.HOME, label: "HomePage" },
  { href: ROUTE_PATHS.THERAPIST_DASHBOARD, label: "Dashboard" },
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

  let routeList: RouteProps[] = [];
  if (isAuthPage) {
    routeList = [{ href: ROUTE_PATHS.HOME, label: "HomePage" }];
  } else if (isHomePage) {
    routeList = homeRoutes;
  } else if (user?.role === UserRole.Therapist) {
    routeList = therapistRoutes;
  } else {
    routeList = clientRoutes;
  }

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
              className="ml-2 flex items-center "
            >
              <img src={logo} alt="Moopy Logo" className="h-[50px]" />
              <img src={moopy} alt="Moopy" className="h-[40px] mt-2" />
            </a>
          </NavigationMenuItem>

          <nav className="hidden md:flex gap-2">
            {routeList.map((route, i) => {
              // 判断当前路径是否与菜单项匹配
              const isActive = location.pathname === route.href;

              return (
                <a
                  rel="noreferrer noopener"
                  href={route.href}
                  key={i}
                  className={`text-[17px] ${buttonVariants({
                    variant: "ghost",
                  })} ${isActive ? "bg-gray-200" : ""}
                  `}
                >
                  {route.label}
                </a>
              );
            })}
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
                  className={`flex items-center ${buttonVariants({
                    variant: "default",
                  })}`}
                >
                  <span>{user?.username}</span>
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

                    {/* userRole */}
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Role</span>
                        {user?.role === UserRole.Therapist && (
                          <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200 text-blue-700">
                            therapist
                          </span>
                        )}

                        {user?.role === UserRole.Client && (
                          <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200 text-green-700">
                            client
                          </span>
                        )}

                        {user?.role === UserRole.Unspecified && (
                          <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200 text-green-700">
                            none
                          </span>
                        )}
                      </div>
                    </div>

                    {/* userCode */}
                    <div className="px-4 py-2 text-sm text-gray-700 border-b break-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">Code</span>
                        <CopyButton text={user?.userCode || ""} />
                      </div>

                      <div className="text-xs text-gray-700 break-all">
                        {user?.userCode ?? "N/A"}
                      </div>
                    </div>

                    {/* Log out */}
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
