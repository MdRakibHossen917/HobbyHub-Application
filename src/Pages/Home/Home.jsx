import React  from "react";
import Slider from "../../Components/Slider/Slider";
import FeaturedGroups from "../../Components/FeaturedGroups/FeaturedGroups";
import { Typewriter } from "react-simple-typewriter";
 

const Home = () => {
  
  return ( 
    <div className="space-y-16">
      {/* Banner / Slider */}
      <Slider />

      {/* Featured Groups */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🌟 Featured Groups
        </h2>
        <FeaturedGroups />
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-12">
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
              <h3 className="text-xl font-semibold mb-2">✅ Verified Groups</h3>
              <p>
                All groups are verified and moderated for a safe experience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                📍 Local Communities
              </h3>
              <p>Find hobby partners near your location to meet offline too.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">⚡ Fast & Easy</h3>
              <p>Quick group join or create options, no complex forms.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">🎨 Hobby Focused</h3>
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
