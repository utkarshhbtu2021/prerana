import React from 'react';

const AboutGameSection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Let’s Play Prerana Game!
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Step into a journey of discovery inspired by the timeless values that shape Bharat. The Prerana Game is an immersive exploration into the living ideals that define character, community, and nationhood. Through stories, dilemmas, and real-life situations, you will understand the core human values that define Prerana.
              </p>
              <p>
               Each question will challenge you not just to recall, but to reflect. Each level will help you deepen your understanding, from clarity to action. And each badge earned will bring you closer to the spirit of Prerana—to be a conscious, courageous, and compassionate individual.
              </p>
              <p>Whether you're a student, teacher, parent, or curious learner, this game is for everyone who believes that values are not just taught, but lived.</p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <video
                className="w-full h-auto"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/prerana-infographic.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
               
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGameSection;