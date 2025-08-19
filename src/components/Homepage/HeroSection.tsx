import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  onStartGame: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartGame }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // const floatingIcons = ['🎯', '📚', '🌟', '🎓', '💡', '🏆'];

  return (
    <section 
      className="relative  flex items-center justify-center" 
    >
      

      {/* Floating Icons */}
      {/* {floatingIcons.map((icon, index) => (
        <div
          key={index}
          className={`absolute text-4xl animate-bounce opacity-70`}
          style={{
            left: `${10 + (index % 3) * 30}%`,
            top: `${20 + Math.floor(index / 3) * 40}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index * 0.2}s`,
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>
      ))} */}

      {/* Center Circles with Orbiting Dots */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        {[800, 600, 400].map((size, index) => (
          <div
            key={size}
            className="absolute rounded-full border bg-white/30 border-white/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              animation: `spin ${20 + index * 5}s linear infinite`
            }}
          >
            {[...Array(4 + index * 2)].map((_, dotIndex) => (
              <div
                key={dotIndex}
                className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `0 ${size / 2}px`,
                  transform: `rotate(${(dotIndex * 360) / (0 + index * 2)}deg) translateY(-50%)`,
                  animation: `orbit ${10 + index * 2}s linear infinite`
                }}
              />
            ))}
          </div>
        ))}
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 heroContent">
        <h1 className="text-6xl md:text-8xl font-medium animate-fade-in-up themeText font-bebas">
          PRERANA
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-normal animate-fade-in-up animation-delay-300 text-black font-inter">
          A visionary journey to inspire India's youth
        </p>
        <button
          onClick={onStartGame}
          className="group themeButton2 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-600"
        >
          <div className="flex items-center space-x-2 font-inter">
            <Play className="w-5 h-5 group-hover:animate-pulse" />
            <span>Start the Game</span>
          </div>
        </button>
      </div>
        <div className='backdrop flex items-center justify-center'>
          <div className=''>
            <img 
                src="/images/circular-bg.svg" 
                alt="Circular Background" 
                className="rounded-full animate-spin-slow hover:pause"
              />
              <img 
                src="/images/indian-map.svg" 
                alt="Circular Background" 
                className="indianMap"
              />
          </div>
        </div>
       
    </section>
  );
};

export default HeroSection;