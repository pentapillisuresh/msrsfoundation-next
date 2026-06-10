import React, { useEffect, useRef } from 'react';
import { GiFarmer, GiBookCover, GiHealthNormal, GiEarthAmerica, GiFirstAidKit } from 'react-icons/gi';
import { FaFemale } from 'react-icons/fa';

const WhatWeDo = () => {
  const cardsRef = useRef([]);

  const initiatives = [
    {
      icon: <GiFarmer className="text-xl" />,
      title: 'Rural Development',
      description: 'Our rural development initiatives are designed to transform underdeveloped regions into self-sustaining and economically empowered communities. We work closely with farmers and local stakeholders to introduce modern agricultural techniques, improve irrigation facilities, and enhance soil productivity. In addition, we focus on building essential infrastructure such as roads, water systems, and storage facilities. By creating diversified livelihood opportunities and providing continuous training and financial support, we ensure long-term resilience, reduce migration to urban areas, and promote inclusive growth across rural regions.',
      number: '05',
      features: ['Sustainable Farming', 'Infrastructure Dev', 'Livelihood Support'],
      status: 'Active',
      image: './images/service18.jpg'
    },
    {
      icon: <GiBookCover className="text-xl" />,
      title: 'Education & Skill Development',
      description: 'We believe that education is the foundation of sustainable development, and our programs are focused on delivering quality learning opportunities to children and youth. Our initiatives include setting up digital classrooms, providing access to modern educational tools, and offering scholarships to underprivileged students. Additionally, we conduct vocational training and skill development programs aligned with current industry demands, enabling individuals to secure meaningful employment. Through career guidance, mentorship, and hands-on training, we empower individuals to build successful careers and contribute positively to society.',
      number: '02',
      features: ['Digital Classrooms', 'Vocational Training', 'Scholarship Programs'],
      status: 'Active',
      image: './images/education1.avif'
    },
    {
      icon: <GiHealthNormal className="text-xl" />,
      title: 'Healthcare & Wellness',
      description: 'Our healthcare and wellness programs are aimed at ensuring accessible, affordable, and quality medical services for underserved populations. We organize regular health camps, provide telemedicine facilities, and collaborate with healthcare professionals to deliver preventive and curative care. Our initiatives also focus on spreading awareness about hygiene, nutrition, and disease prevention, helping communities adopt healthier lifestyles. By addressing both immediate medical needs and long-term health education, we aim to reduce healthcare disparities and improve the overall quality of life.',
      number: '04',
      features: ['Health Camps', 'Telemedicine', 'Awareness Programs'],
      status: 'Active',
      image: './images/service17.jpg'
    },
    {
      icon: <FaFemale className="text-xl" />,
      title: 'Women Empowerment',
      description: 'Our women empowerment initiatives focus on enabling women to achieve financial independence, social equality, and leadership roles within their communities. We establish self-help groups, provide entrepreneurship training, and offer skill development programs that help women generate sustainable income. Financial literacy workshops and access to micro-financing opportunities further strengthen their ability to manage resources effectively. By fostering confidence, leadership skills, and community participation, we empower women to become change-makers and drive inclusive growth.',
      number: '06',
      features: ['Self-Help Groups', 'Skill Training', 'Financial Literacy'],
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format'
    },
    {
      icon: <GiEarthAmerica className="text-xl" />,
      title: 'Environmental Sustainability',
      description: 'Our environmental sustainability initiatives are dedicated to preserving natural resources and promoting eco-friendly practices for a greener future. We conduct large-scale tree plantation drives, implement waste management systems, and encourage the adoption of renewable energy solutions such as solar power. Additionally, we run awareness campaigns to educate communities about environmental conservation and responsible resource usage. Through these efforts, we aim to combat climate change, reduce carbon footprints, and ensure a sustainable ecosystem for future generations.',
      number: '03',
      features: ['Tree Plantation', 'Waste Management', 'Renewable Energy'],
      status: 'Active',
      image: './images/service19.jpg'
    },
    {
      icon: <GiFirstAidKit className="text-xl" />,
      title: 'Disaster Relief & Social Welfare',
      description: 'We provide immediate and effective response during natural disasters and emergencies, ensuring that affected communities receive timely support and assistance. Our relief efforts include distributing essential supplies such as food, water, medical aid, and temporary shelter. Beyond emergency response, we focus on long-term rehabilitation programs that help individuals rebuild their lives with dignity and stability. By collaborating with local authorities and volunteers, we ensure a coordinated approach to disaster management and social welfare, strengthening community resilience.',
      number: '01',
      features: ['Emergency Response', 'Relief Camps', 'Rehabilitation'],
      status: 'Active',
      image: './images/diaster.avif'
    },
  ];

  // Sort the initiatives once
  const sortedInitiatives = [...initiatives].sort((a, b) => a.title.localeCompare(b.title));

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      cardsRef.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - center);
        const maxDistance = viewportHeight / 2;

        const progress = 1 - Math.min(distanceFromCenter / maxDistance, 1);

        // Adjust scale/brightness based on scroll
        const scale = 0.92 + progress * 0.08;
        const brightness = 0.92 + progress * 0.08;

        card.style.transform = `scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="what-we-do" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[5px] text-secondary font-semibold mb-3 inline-block">
            WHAT WE DO
          </span>
          <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm">
            Our comprehensive approach to social development covers multiple sectors — 
            creating lasting impact in communities across the nation
          </p>
        </div>

        {/* Card Container */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {sortedInitiatives.map((item, index) => (
            <div
              key={index}
              className="sticky top-20 sm:top-24" // Sticky works on mobile now
              style={{ zIndex: index + 1 }}
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col lg:flex-row"
                style={{
                  transform: "scale(0.92)",
                  filter: "brightness(0.92)",
                  transition: "transform 0.2s ease-out, filter 0.2s ease-out",
                  willChange: "transform, filter"
                }}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ minHeight: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>
                
                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between" style={{ minHeight: '400px' }}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-dark leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-3xl lg:text-4xl font-bold text-secondary/20">
                        {item.number}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 text-justify lg:line-clamp-none">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-semibold rounded-full uppercase tracking-wider">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Active Project</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {['NK', 'RJ', 'SP'].map((initial, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-[8px] text-white font-bold uppercase">
                            {initial}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 ml-2 font-medium">+ Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Custom scroll behavior for the section if needed */
        #what-we-do {
          overflow-visible: true;
        }
        
        /* Ensure stacking context is maintained */
        .sticky {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;