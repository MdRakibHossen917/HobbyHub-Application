import React, { useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import FeaturedGroups from "../../Components/FeaturedGroups/FeaturedGroups";
import GroupCard from "../../Components/GroupCard/GroupCard";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const [todayGroups, setTodayGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hobbyhub-server-steel.vercel.app/todaysGroups")
      .then((res) => res.json())
      .then((data) => {
        setTodayGroups(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching today groups:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16">
      {/* Banner / Slider */}
      <Slider />

      {/* Today’s Groups */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          🎉 Explore Fresh Hobby Circles
        </h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[150px]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : todayGroups.length === 0 ? (
          <p className="text-center text-gray-500">No groups created today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayGroups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Groups */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🌟 Featured Groups
        </h2>
        <FeaturedGroups />
      </section>

      {/* How It Works */}
      <section className="  py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="mr-2">🧭</span>
            <Typewriter
              words={[
                "How It Works",
                "How Grouping Works",
                "How You Collaborate",
              ]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={100}
              delaySpeed={4000}
            />
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
              <p>Register with your email and get started.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Join Groups</h3>
              <p>Explore and join active groups based on your interests.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                3. Start Collaborating
              </h3>
              <p>Chat and contribute within your group to grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">💡 Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl flex items-center gap-1 font-semibold mb-2">
                <img
                  className="h-8"
                  src="https://img.icons8.com/?size=80&id=S9fiIsPEdkIm&format=png"
                  alt=""
                />
                Verified Groups
              </h3>
              <p>
                All groups are verified and moderated for a safe experience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl flex items-center gap-1 font-semibold mb-2">
                <img
                  className="h-8"
                  src="https://img.icons8.com/?size=80&id=Ef7yqaKIdW3m&format=png"
                  alt=""
                />
                Local Communities
              </h3>
              <p>Find hobby partners near your location to meet offline too.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl flex items-center gap-1 font-semibold mb-2">
                <img
                  className="h-8"
                  src="https://img.icons8.com/?size=80&id=eZxI4pmcjbtu&format=png"
                  alt=""
                />
                Fast & Easy
              </h3>
              <p>Quick group join or create options, no complex forms.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl flex items-center font-semibold mb-2">
                <img
                  className="h-8"
                  src="https://img.icons8.com/?size=80&id=Fy5kgkAHvEXq&format=png"
                  alt=""
                />
                Hobby Focused
              </h3>
              <p>
                From drawing to running, join groups that match your passion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
