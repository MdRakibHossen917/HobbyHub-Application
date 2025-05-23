import React from 'react';

const technologies = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    description:
      "Backend-as-a-Service for authentication, database, and hosting.",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    description: "A utility-first CSS framework for rapid UI styling.",
  },
  {
    name: "React Router",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Declarative routing for React applications.",
  },
  {
    name: "SweetAlert2",
    icon: "https://sweetalert2.github.io/assets/favicon.png",
    description: "Beautiful and customizable alert messages.",
  },
];
const Technologies = () => {
    return (
      <div>
        <section className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Technologies Used
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {technologies.map(({ name, icon, description }) => (
              <div
                key={name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
              >
                <img
                  src={icon}
                  alt={`${name} logo`}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
};

export default Technologies;