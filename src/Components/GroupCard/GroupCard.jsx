import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";
import { ImUsers } from "react-icons/im";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const GroupCard = ({ group }) => {
  return (
    <div className="my-5 mx-10">
      <div className="bg-white h-96 shadow-md rounded-lg p-4 flex flex-col">
        <img
          src={group.image}
          alt={group.groupName}
          className="w-full h-56 object-cover rounded"
        />

        <h3 className="text-xl font-bold mt-2">{group.groupName}</h3>

        <div className="flex items-start gap-1 mt-2 text-gray-600 text-sm">
          <MdDescription size={20} className="mt-1" />
          <p
            className="max-h-20 overflow-y-auto flex-1"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {group.description}
          </p>
        </div>

        <p className="text-sm mt-1 flex items-center text-gray-600 gap-2">
          <MdLocationOn size={20} className="text-lg" />
          <span>{group.location}</span>
          <span>|</span>
          <ImUsers className="text-lg" />
          <span>{group.maxMembers} members</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
          <FaRegCalendarAlt size={20} /> {group.formattedDate} |{" "}
          <FcAlarmClock size={20} /> {group.formatHour}
        </p>
      </div>
    </div>
  );
};

export default GroupCard;
