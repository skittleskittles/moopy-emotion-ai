import React from "react";
import therapistImg from "../../assets/therapist.png";
import clientImg from "../../assets/client.png";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/Routes";

const RoleSelectionPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = async (role: "therapist" | "client") => {
    if (!user || !token) {
      console.error("User not logged in");
      return;
    }

    try {
      // await axios.put(
      //   `/api/users/${user.id}`, // todo
      //   { role },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // Role updated successfully
      console.log(`Role set to ${role}`);
      if (role == "therapist") {
        navigate(ROUTE_PATHS.THERAPIST_CREDENTIALS); // todo
      } else {
        navigate(ROUTE_PATHS.CLIENT_CONNECT_THERAPIST); // todo
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-[42px] sm:text-[55px] leading-tight font-serif text-[#0F0F0E] tracking-tight mt-10">
          Let’s get started – choose your role
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#A9A6A6] mt-2">
          To tailor your experience, please choose your role
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-32">
        {/* Therapist Card */}
        <div
          onClick={() => handleRoleSelect("therapist")}
          className="bg-[#fafaf5] rounded-xl shadow-md p-6 w-[395px] h-[444px] cursor-pointer hover:shadow-xl transition"
        >
          <div className="flex justify-center">
            <img
              src={therapistImg}
              alt="Therapist Icon"
              className="w-[220px] h-[220px] mt-10"
            />
          </div>
          <h2 className="text-center font-semibold text-[28px] mt-5">
            Therapist
          </h2>
          <p className="text-center text-[20px] text-gray-500 mt-4">
            Licensed to offer therapeutic care
          </p>
        </div>

        {/* Client Card */}
        <div
          onClick={() => handleRoleSelect("client")}
          className="bg-[#fafaf5] rounded-xl shadow-md p-6 w-[395px] h-[444px] cursor-pointer hover:shadow-xl transition"
        >
          <div className="flex justify-center">
            <img
              src={clientImg}
              alt="Client Icon"
              className="w-[220px] h-[220px] mt-10 ml-6"
            />
          </div>
          <h2 className="text-center font-semibold text-[28px] mt-5">Client</h2>
          <p className="text-center text-[20px] text-gray-500 mt-4">
            Seeking support & self-understanding
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
