import React, { useEffect, useState } from "react";
import GroupCard from "../GroupCard/GroupCard";

const TodaysGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hobbyhub-server-steel.vercel.app/todaysGroups") // your server URL
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600 py-10">
        No groups found today.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-10 text-green-600">
        🎯 Today's 6 groups
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default TodaysGroups;
