"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Complete list of all services with all subpoints
const allServices = [
  {
    id: 1,
    title: "Food Donation & Nutrition Support",
    frontImage: "/images/service2.avif",
    subpoints: [
      "Daily Meals for Needy",
      "Festival Annadanam Sponsorship",
      "Midday Meal Programs",
      "Emergency Food Relief",
      "Nutrition for Malnourished Children",
      "Maternal Nutrition Support",
    ],
  },
  {
    id: 2,
    title: "CSR & Corporate Contribution Initiatives",
    frontImage: "/images/meeting.jpg",
    subpoints: [
      "Corporate Social Responsibility Projects",
      "Adopt a Village / School",
      "Employee Engagement Programs",
      "Long-term Partnership Projects",
      "CSR Tax Benefits Documentation",
      "Impact Assessment Reports",
    ],
  },
  {
    id: 3,
    title: "Disaster Relief & Emergency Response Services",
    frontImage: "/images/service7.jpg",
    subpoints: [
      "Flood / Cyclone Relief",
      "Earthquake Response",
      "Emergency Response Fund",
      "Rehabilitation Support",
      "Crisis Food & Shelter",
      "Medical Emergency Response Teams",
    ],
  },
  {
    id: 4,
    title: "Education Support, Scholarships & Skill Development",
    frontImage: "/images/service15.png",
    subpoints: [
      "Sponsor a Child's Education",
      "School Infrastructure Development",
      "Books, Uniforms & Learning Materials",
      "Digital Learning & Smart Classrooms",
      "Merit & Need-Based Scholarships",
      "Vocational Training Programs",
    ],
  },
  {
    id: 5,
    title: "Environmental Protection & Sustainability Programs",
    frontImage: "/images/environment.avif",
    subpoints: [
      "Tree Plantation Drives",
      "Water Conservation Projects",
      "Clean India Initiatives",
      "Sustainable Development Programs",
      "Plastic Waste Management",
      "Renewable Energy Projects",
    ],
  },
  {
    id: 6,
    title: "General Fund & Social Welfare Support",
    frontImage: "/images/donation.avif",
    subpoints: [
      "Support Any Ongoing Initiative",
      "Flexible Fund Allocation",
      "Operational & Administrative Support",
      "Emergency General Assistance",
      "Unforeseen Crisis Support",
    ],
  },
  {
    id: 7,
    title: "Goshala Seva & Animal Welfare Activities",
    frontImage: "/images/service11.avif",
    subpoints: [
      "Cow Feeding Seva",
      "Goshala Maintenance",
      "Medical Care for Cows",
      "Rescue & Protection",
      "Adopt a Cow Program",
      "Animal Shelter Support",
    ],
  },
  {
    id: 8,
    title: "Healthcare Services, Medical Aid & Health Awareness Programs",
    frontImage: "/images/service3.avif",
    subpoints: [
      "Free Medical Camps",
      "Medicines for the Poor",
      "Support for Surgeries",
      "Health Awareness Programs",
      "Mental Health Support",
      "Preventive Health Checkups",
    ],
  },
  {
    id: 9,
    title: "Infrastructure Development & Public Utility Projects",
    frontImage: "/images/service16.png",
    subpoints: [
      "School & Classroom Construction",
      "Hospital & Medical Facility Setup",
      "Ashramam & Spiritual Center Development",
      "Drinking Water Infrastructure",
      "Community Halls & Public Utility Spaces",
      "Road & Pathway Development",
    ],
  },
  {
    id: 10,
    title: "Rural & Community Development Initiatives",
    frontImage: "/images/rural.jpg",
    subpoints: [
      "Village Development Projects",
      "Clean Water Initiatives",
      "Sanitation & Hygiene Programs",
      "Skill Development for Youth",
      "Farmers Support Programs",
      "Rural Entrepreneurship",
    ],
  },
  {
    id: 11,
    title: "Spiritual, Cultural & Value-Based Programs",
    frontImage: "/images/service4.jpg",
    subpoints: [
      "Temple Development & Maintenance",
      "Vedic & Spiritual Programs",
      "Yagnas, Pujas & Ritual Sponsorship",
      "Preservation of Indian Culture",
      "Moral & Ethical Value Education",
      "Spiritual Retreats & Camps",
    ],
  },
  {
    id: 12,
    title: "Women Empowerment & Child Welfare Programs",
    frontImage: "/images/service6.avif",
    subpoints: [
      "Women Empowerment Programs",
      "Child Protection & Care",
      "Nutrition Programs",
      "Support for Orphaned Children",
      "Self-Help Groups for Women",
      "Girl Child Education Support",
    ],
  },
  {
    id: 13,
    title: "Youth Development & Employment Support Initiatives",
    frontImage: "/images/service15.png",
    subpoints: [
      "Youth Leadership Programs",
      "Career Counseling",
      "Job Placement Assistance",
      "Entrepreneurship Development",
      "Soft Skills Training",
      "Internship Opportunities",
    ],
  },
  {
    id: 14,
    title: "Cleanliness, Sanitation & Public Health Campaigns",
    frontImage: "/images/environment.avif",
    subpoints: [
      "Swachh Bharat Initiatives",
      "Community Toilet Construction",
      "Hygiene Awareness Drives",
      "Waste Segregation Programs",
      "Public Health Workshops",
      "Sanitary Pad Distribution",
    ],
  },
  {
    id: 15,
    title: "Drinking Water & Basic Needs Support Programs",
    frontImage: "/images/rural.jpg",
    subpoints: [
      "Borewell & Handpump Installation",
      "Water Purification Systems",
      "RO Water Plants",
      "Emergency Water Supply",
      "Water Tank Construction",
      "Basic Necessities Kits Distribution",
    ],
  },
  {
    id: 16,
    title: "Senior Citizen Welfare & Support Services",
    frontImage: "/images/service4.jpg",
    subpoints: [
      "Elderly Care Programs",
      "Old Age Home Support",
      "Medical Assistance for Seniors",
      "Daily Needs Support",
      "Companionship Programs",
      "Pension Facilitation",
    ],
  },
  {
    id: 17,
    title: "Livelihood Development & Self-Employment Programs",
    frontImage: "/images/service6.avif",
    subpoints: [
      "Skill Training Programs",
      "Micro-Enterprise Support",
      "Tool & Equipment Distribution",
      "Business Mentorship",
      "Market Linkage Support",
      "Financial Literacy Workshops",
    ],
  },
  {
    id: 18,
    title: "Social Awareness & Public Welfare Campaigns",
    frontImage: "/images/meeting.jpg",
    subpoints: [
      "Legal Awareness Camps",
      "Road Safety Campaigns",
      "Anti-Drug Drives",
      "Voter Awareness Programs",
      "Digital Literacy Campaigns",
      "Community Outreach Programs",
    ],
  },
];

const ServiceCard = ({ service, onSupport, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getAnimationDelay = () => {
    const delays = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850];
    return delays[index % delays.length];
  };

  const getAnimationDirection = () => {
    const directions = ['fade-up', 'fade-right', 'fade-left', 'zoom-in'];
    return directions[index % directions.length];
  };

  return (
    <div 
      data-aos={getAnimationDirection()}
      data-aos-delay={getAnimationDelay()}
      data-aos-duration="800"
      data-aos-easing="ease-out-cubic"
      className="relative group/card"
    >
      <div 
        className="book-wrapper" 
        style={{ perspective: '2000px' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div 
          className="book relative w-full h-[400px]"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Cover (Front) */}
          <div 
            className="cover absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-[1100ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer"
            style={{
              transformOrigin: 'left center',
              transform: isOpen ? 'rotateY(-150deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden',
              zIndex: 10,
            }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${service.frontImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="text-[#5C6F5C] text-[10px] font-bold bg-[#EAF3E6] px-3 py-1 rounded-full tracking-[2px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="text-center transform transition-all duration-700 group-hover/card:translate-y-[-10px]">
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight line-clamp-2">
                    {service.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-white/60 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Back Pages (Content) */}
          <div 
            className="pages absolute inset-0 rounded-2xl shadow-inner overflow-hidden border border-gray-100"
            style={{
              backgroundColor: '#F9FBF9',
              zIndex: 5,
            }}
          >
            <div className={`w-full h-full p-5 flex flex-col transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-4">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider line-clamp-1">{service.title}</h4>
                <div className="w-8 h-0.5 bg-[#5C6F5C] mx-auto mt-2 opacity-40" />
              </div>

              <ul className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {service.subpoints.map((point, idx) => (
                  <li key={idx} className="text-[12px] text-gray-600 flex items-start gap-2">
                    <div className="mt-0.5 flex-shrink-0">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#5C6F5C]/10 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#5C6F5C]" />
                      </div>
                    </div>
                    <span className="leading-tight">{point}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSupport(service)}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#5C6F5C] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#4a5a4a] transition-all duration-500 shadow-lg"
              >
                Support Cause
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  // Initially show only 8 cards
  const displayedServices = showAll ? allServices : allServices.slice(0, 8);

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 120,
    });
  }, []);

  const handleSupport = (service) => {
    // Navigate to donate page with query parameters instead of state
    router.push(`/donate?service=${encodeURIComponent(service.title)}&cause=${encodeURIComponent(service.title)}`);
  };

  // Sort alphabetically by title
  const sortedServices = [...displayedServices].sort((a, b) => a.title.localeCompare(b.title));

  const handleViewMore = () => {
    setShowAll(true);
    // Re-init AOS for new elements
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  const handleViewLess = () => {
    setShowAll(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div 
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
          className="mb-16 text-center"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#5C6F5C] font-bold mb-4 inline-block uppercase opacity-70">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight font-heading">
            What We <span className="text-[#5C6F5C]">Do</span>
          </h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 text-sm leading-relaxed">
            Every contribution creates a ripple of change. Explore our dedicated programs 
            aimed at community upliftment and sustainable welfare.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {sortedServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} onSupport={handleSupport} index={idx} />
          ))}
        </div>

        {/* View More / View Less Button */}
        <div className="text-center mt-16">
          {!showAll ? (
            <button
              onClick={handleViewMore}
              data-aos="fade-up"
              data-aos-delay="200"
              className="group relative px-8 py-3 bg-transparent border-2 border-[#5C6F5C] text-[#5C6F5C] font-semibold rounded-full overflow-hidden transition-all duration-500 hover:text-white hover:border-transparent"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Services 
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-[#5C6F5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            </button>
          ) : (
            <button
              onClick={handleViewLess}
              data-aos="fade-up"
              className="group relative px-8 py-3 bg-[#5C6F5C] text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:bg-[#4a5a4a] shadow-md"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Show Less Services
              </span>
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        .book-wrapper { perspective: 2000px; }
        .book { transform-style: preserve-3d; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5C6F5C;
          border-radius: 10px;
        }

        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Premium AOS Animations */
        [data-aos="fade-up"] {
          transform: translateY(50px);
          opacity: 0;
          transition-property: transform, opacity;
        }
        [data-aos="fade-up"].aos-animate {
          transform: translateY(0);
          opacity: 1;
        }

        [data-aos="fade-down"] {
          transform: translateY(-50px);
          opacity: 0;
          transition-property: transform, opacity;
        }
        [data-aos="fade-down"].aos-animate {
          transform: translateY(0);
          opacity: 1;
        }

        [data-aos="fade-right"] {
          transform: translateX(-50px);
          opacity: 0;
          transition-property: transform, opacity;
        }
        [data-aos="fade-right"].aos-animate {
          transform: translateX(0);
          opacity: 1;
        }

        [data-aos="fade-left"] {
          transform: translateX(50px);
          opacity: 0;
          transition-property: transform, opacity;
        }
        [data-aos="fade-left"].aos-animate {
          transform: translateX(0);
          opacity: 1;
        }

        [data-aos="zoom-in"] {
          transform: scale(0.95);
          opacity: 0;
          transition-property: transform, opacity;
        }
        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
          opacity: 1;
        }

        .font-heading {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
    </section>
  );
};

export default Services;