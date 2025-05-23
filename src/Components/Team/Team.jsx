import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Project Manager",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "John oversees the project development and ensures timely delivery.",
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "Jane leads the coding efforts and technical architecture.",
    },
    {
      name: "Emily Johnson",
      role: "UI/UX Designer",
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
      bio: "Emily designs the user experience and visual elements of the site.",
    },
    {
      name: "Michael Brown",
      role: "QA Engineer",
      photo: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "Michael tests the project thoroughly to ensure quality.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {teamMembers.map(({ name, role, photo, bio }) => (
          <div
            key={name}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={photo}
              alt={`${name}'s photo`}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-center">{name}</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {role}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm text-center">
              {bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
