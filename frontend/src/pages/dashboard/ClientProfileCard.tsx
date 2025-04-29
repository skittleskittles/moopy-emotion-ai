import { ClientDetailVo } from "@/models/ClientDetail";
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
    <div className="flex justify-center mx-10 ">
      <div className="w-4/5 bg-white shadow-lg rounded-xl p-6 mx-10 my-8 flex items-center justify-between">
        {/* Left section: Avatar + Info */}
        <div className="flex items-center gap-6 ml-[5%]">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[#f9f2f2] flex items-center justify-center overflow-hidden">
            <img
              src={avatarImg}
              alt="Avatar"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#6782B8] flex items-center gap-2">
              {clientDetail.fullName}
            </h2>
            <p className="text-gray-500 font-semibold mt-1">
              NICKNAME: {clientDetail.username}
            </p>
          </div>
        </div>

        <div className="flex flex-col ml-[20%] mt-10">
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            📅 Connected Date: {formatDate(clientDetail.connectedDate)}
          </p>
          <p className="text-gray-500 flex items-center gap-2">
            📅 Last Active Date: {formatDate(clientDetail.lastLoginDate)}
          </p>
        </div>

        {/* Divider */}
        <div className="h-24 w-px bg-gray-300 "></div>

        {/* Right section: Score */}
        <div className="flex flex-col items-center mr-14">
          <div className="text-gray-600 font-semibold text-lg mb-2">Score</div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`text-3xl ${
                  idx < Math.round(clientDetail.score / 20)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </div>
            ))}
            <div className="ml-3 text-4xl font-bold text-gray-700">
              {clientDetail.score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
