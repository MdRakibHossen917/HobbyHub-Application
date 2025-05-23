import React, { useState, useEffect } from "react";
import GroupCard from "../../Components/GroupCard/GroupCard";
import { useLoaderData } from "react-router";

const AllGroups = () => {
  const initialGroup = useLoaderData();

  // State to handle groups and loading
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set groups from loader data and stop loading
  useEffect(() => {
    if (initialGroup) {
      setAllGroups(initialGroup);
      setLoading(false);
    }
  }, [initialGroup]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  if (allGroups.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-800 shadow  mb-6 mt-10">
        All Groups
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allGroups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
