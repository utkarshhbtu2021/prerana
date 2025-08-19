import React from 'react';
import { ExternalLink } from 'lucide-react';
import { preranaValues } from '../../data/mockData';

interface ValuesSectionProps {
  onExploreClick: (value: any) => void;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800  font-bebas">Prerana Values</h2> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {preranaValues.slice(0, 5).map((value, index) => (
            <ValueCard 
              key={value.id} 
              value={value} 
              onExploreClick={onExploreClick}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {preranaValues.slice(5).map((value, index) => (
            <ValueCard 
              key={value.id} 
              value={value} 
              onExploreClick={onExploreClick}
              delay={(index + 5) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueCard: React.FC<{ value: any; onExploreClick: (value: any) => void; delay: number }> = ({ 
  value, 
  onExploreClick, 
  delay 
}) => {
  const isGradient = value.color.includes('gradient');
  
  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2  animate-fade-in-up homeValueCard"
      style={{ background: isGradient ? value.color : value.color, animationDelay: `${delay}ms` }}
    >
      {/* Icon with floating animation */}
       
        <div 
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl border-4  valueIcon"
          style={{
             
            borderColor: value.color,
            boxShadow: `0 4px 20px ${value.color}33`
          }}
        >
          
          <img src={value.icon} alt={value.title} className="w-10 h-10" />
        </div> 

      {/* Content */}
      <div className="px-6 pb-6 text-center valueContent">
        <h3 className="font-medium  mb-2 font-bebas title">
          {value.title}
        </h3>
         
        <button
          onClick={() => onExploreClick(value)}
          className="inline-flex items-center font-medium space-x-1 font-inter color-white u-link"
          
        >
          <span>Explore</span> 
        </button>
      </div>
    </div>
  );
};

export default ValuesSection;