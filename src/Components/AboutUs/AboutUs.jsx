import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">About HobbyHub</h2>
      <p className="text-gray-700 mb-4 leading-relaxed text-justify">
        <strong>HobbyHub</strong> is your local community hub where hobbyists of
        all kinds come together. We believe in the power of shared passions —
        whether it’s painting, gardening, coding, or hiking — to bring people
        closer and inspire creativity.
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed text-justify">
        Our platform helps you find, join, or create hobby groups near you,
        making it easy to meet like-minded friends, learn new skills, and have
        fun together.
      </p>
      <p className="text-gray-700 leading-relaxed text-justify">
        At HobbyHub, we’re committed to building a welcoming space where
        everyone can explore their interests and build lasting connections.
      </p>
    </section>
  );
};

export default AboutUs;
