import { ClientDetailVo } from "@/models/ClientDetail";
import { FaRegCalendarAlt } from "react-icons/fa";
import avatarImg from "../../assets/avatar.png";

interface ClientProfileCardProps {
  clientDetail: ClientDetailVo;
}

export const ClientProfileCard = ({ clientDetail }: ClientProfileCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 flex items-center justify-between px-14">
      {/* Left section: Avatar + Info */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#f9f2f2] flex items-center justify-center overflow-hidden">
          <img
            src={avatarImg}
            alt="Avatar"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name + Nickname */}
        <div>
          <h2 className="text-3xl font-bold text-[#6782B8]">
            {clientDetail.fullName}
          </h2>
          <p className="text-xl text-gray-500 font-semibold">
            Nickname: {clientDetail.username}
          </p>
        </div>
      </div>

      {/* Right section: Dates */}
      <div className="text-base text-gray-600 space-y-1 text-right mt-14">
        <p className="flex items-center gap-2">
          <FaRegCalendarAlt className="text-lg text-gray-600" />
          <span>Connected: {formatDate(clientDetail.connectedDate)}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaRegCalendarAlt className="text-lg text-gray-600" />
          <span>Last Active: {formatDate(clientDetail.lastLoginDate)}</span>
        </p>
      </div>
    </div>
  );
};
