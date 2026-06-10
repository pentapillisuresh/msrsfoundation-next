"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiMail, FiLinkedin, FiArrowRight, FiCheckCircle, FiBriefcase } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApiService from '@/services/ApiService';

const BoardManagement = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [membersByCategory, setMembersByCategory] = useState({});

  // Static Founder Data
  const founder = {
    name: "Srinivasa Sai Kavali",
    position: "Founder & Director",
    message: "MSRS Foundation is built on the pillars of integrity and selfless service. Our mission is to bridge the gap between opportunity and those who need it most in our communities.",
    bio: "A visionary leader and professional software architect, Srinivasa Sai Kavali founded the Maha Shree Rudra Samsthanam Foundation to drive structured community development and educational support across Andhra Pradesh and Telangana.",
    achievements: ["CSR-1 Registered Leader", "Tech-Social Innovator", "Founder of MSRS Foundation", "15+ Years Tech Experience"],
    image: "/images/profilepic3.jpg",
    email: "director@msrsfoundation.org",
    linkedin: "#"
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out',
    });

    fetchCategoriesAndMembers();
  }, []);

  const fetchCategoriesAndMembers = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoryRes = await ApiService.get("/categories?categoryRelated=board");
      const fetchedCategories = categoryRes?.data || [];
      
      // Add "All" category at the beginning
      const allCategory = { id: 'all', name: 'All', description: 'View all board members' };
      const categoriesWithAll = [allCategory, ...fetchedCategories];
      setCategories(categoriesWithAll);
      
      // Fetch members for each category
      const membersMap = {};
      
      // Fetch all members for "All" category
      const allMembersRes = await ApiService.get("/board");
      membersMap['all'] = allMembersRes?.data?.data || [];
      
      // Fetch members for each specific category
      for (const category of fetchedCategories) {
        const categoryMembersRes = await ApiService.get(`/board?categoryId=${category.id}`);
        membersMap[category.id] = categoryMembersRes?.data?.data || [];
      }
      
      setMembersByCategory(membersMap);
      setActiveCategory('all');
      
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const getImageUrl = (image) => {
    if (!image) return '/images/default-profile.png';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/uploads')) return `http://localhost:3000${image}`;
    return `http://localhost:3000/uploads/images/${image}`;
  };

  // Filter out founder from board members
  const getFilteredMembers = (members) => {
    return members.filter(m => 
      !m.role?.toLowerCase().includes('founder') && 
      !m.role?.toLowerCase().includes('director')
    );
  };

  const currentMembers = getFilteredMembers(membersByCategory[activeCategory] || []);
  
  // Get members for each category section (excluding 'all')
  const getCategoryMembers = (categoryId) => {
    return getFilteredMembers(membersByCategory[categoryId] || []);
  };

  return (
    <div className="bg-[#FCFDFB] font-sans selection:bg-[#667A62] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        .member-card { 
          height: auto; 
          min-height: 180px;
          transition: all 0.3s ease; 
        }
        .member-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 12px 30px rgba(44, 62, 43, 0.08); 
        }
        
        .category-tab {
          transition: all 0.3s ease;
        }
        .category-tab:hover {
          transform: translateY(-2px);
        }
        
        .category-section {
          scroll-margin-top: 100px;
        }
      `}</style>

      {/* Hero Section - Static */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Board Management Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              MSRS FOUNDATION
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Board & Leadership
          </h1>
          <div className="flex justify-center gap-2 mb-5">
            <div className="w-12 h-0.5 bg-[#667A62]"></div>
            <div className="w-6 h-0.5 bg-[#667A62]"></div>
            <div className="w-3 h-0.5 bg-[#667A62]"></div>
          </div>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Leadership that Inspires Change - Our leadership team brings vision, integrity, and expertise
            to drive meaningful social impact across communities.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <section className="py-10 bg-white border-b sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    handleCategoryChange(cat.id);
                    if (cat.id !== 'all') {
                      const element = document.getElementById(`category-${cat.id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className={`category-tab px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#667A62] text-white shadow-md'
                      : 'border border-[#667A62] text-[#667A62] hover:bg-[#667A62] hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-32 text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#667A62]">Loading Board Members...</p>
        </div>
      )}

      {/* Founder Section - Static */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative" data-aos="fade-right">
              <div className="relative z-10 border-[12px] border-[#F7F9F5] rounded-lg overflow-hidden">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-[550px] object-cover object-[center_10%]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#667A62]/10 -z-0 rounded-full"></div>
            </div>
            
            <div data-aos="fade-left">
              <h4 className="text-[#667A62] font-bold text-xs tracking-widest uppercase mb-4">The Director's Message</h4>
              <h2 className="font-serif text-4xl text-[#2C3E2B] mb-6">{founder.name}</h2>
              
              <div className="bg-[#F7F9F5] p-8 mb-8 border-l-4 border-[#667A62] relative rounded-r-lg">
                <FaQuoteLeft className="text-4xl text-[#667A62]/10 absolute top-4 right-4" />
                <p className="text-[#4A5C46] italic text-lg leading-relaxed font-serif">
                  "{founder.message}"
                </p>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {founder.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {founder.achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-[#2C3E2B]">
                    <FiCheckCircle className="text-[#667A62]" /> {a}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href="/contact">
                  <button className="bg-[#2C3E2B] text-white px-8 py-3 text-xs font-bold hover:bg-[#667A62] transition-all rounded">
                    GET IN TOUCH
                  </button>
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin className="text-gray-400 hover:text-[#667A62] cursor-pointer transition-colors" size={18} />
                  </a>
                  <a href={`mailto:${founder.email}`}>
                    <FiMail className="text-gray-400 hover:text-[#667A62] cursor-pointer transition-colors" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Category Section - Shows based on selected tab */}
      {!loading && activeCategory === 'all' && (
        <section className="py-24 bg-[#F7F9F5]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h3 className="font-serif text-3xl text-[#2C3E2B] mb-2">
                All Board Members
              </h3>
              <div className="w-16 h-0.5 bg-[#667A62] mx-auto mt-4"></div>
              <p className="text-gray-400 text-xs mt-4">
                Complete leadership team driving our mission forward
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {currentMembers.map((member, i) => (
                <div 
                  key={member.id || i} 
                  className="member-card flex bg-white border border-[#EAF6E3] overflow-hidden rounded-lg" 
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="w-1/3 h-full overflow-hidden">
                    <img 
                      src={getImageUrl(member.image)} 
                      className="w-full h-full object-cover" 
                      alt={member.name}
                      onError={(e) => { e.target.src = '/images/default-profile.png'; }}
                    />
                  </div>
                  <div className="w-2/3 p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#2C3E2B]">{member.name}</h4>
                      <span className="text-[#667A62] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                        {member.role || member.position}
                      </span>
                      <p className="text-gray-500 text-[11px] line-clamp-3 leading-relaxed mb-2">
                        {member.bio || "Board member dedicated to community development"}
                      </p>
                      {member.email && (
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                          <FiMail size={10} /> {member.email}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 pt-3">
                      {member.email && (
                        <a href={`mailto:${member.email}`}>
                          <FiMail className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <FiLinkedin className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category-wise Sections - Show all categories when 'all' is selected */}
      {!loading && activeCategory === 'all' && categories.filter(c => c.id !== 'all').map((category) => {
        const categoryMembers = getCategoryMembers(category.id);
        if (categoryMembers.length === 0) return null;
        
        return (
          <section 
            key={category.id} 
            id={`category-${category.id}`}
            className="py-24 bg-white border-t border-[#EAF6E3] category-section"
          >
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16" data-aos="fade-up">
                <h3 className="font-serif text-3xl text-[#2C3E2B] mb-2">
                  {category.name}
                </h3>
                <div className="w-16 h-0.5 bg-[#667A62] mx-auto mt-4"></div>
                <p className="text-gray-400 text-xs mt-4">
                  {category.description || `Meet our dedicated ${category.name} team`}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {categoryMembers.map((member, i) => (
                  <div 
                    key={member.id || i} 
                    className="member-card flex bg-[#FCFDFB] border border-[#EAF6E3] overflow-hidden rounded-lg" 
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <div className="w-1/3 h-full overflow-hidden">
                      <img 
                        src={getImageUrl(member.image)} 
                        className="w-full h-full object-cover" 
                        alt={member.name}
                        onError={(e) => { e.target.src = '/images/default-profile.png'; }}
                      />
                    </div>
                    <div className="w-2/3 p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-[#2C3E2B]">{member.name}</h4>
                        <span className="text-[#667A62] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                          {member.role || member.position}
                        </span>
                        <p className="text-gray-500 text-[11px] line-clamp-3 leading-relaxed mb-2">
                          {member.bio || "Board member dedicated to community development"}
                        </p>
                        {member.email && (
                          <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                            <FiMail size={10} /> {member.email}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3 pt-3">
                        {member.email && (
                          <a href={`mailto:${member.email}`}>
                            <FiMail className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <FiLinkedin className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Individual Category View - When specific category is selected */}
      {!loading && activeCategory !== 'all' && (
        <section className="py-24 bg-[#F7F9F5]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h3 className="font-serif text-3xl text-[#2C3E2B] mb-2">
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <div className="w-16 h-0.5 bg-[#667A62] mx-auto mt-4"></div>
              <p className="text-gray-400 text-xs mt-4">
                {categories.find(c => c.id === activeCategory)?.description || `Meet our dedicated team members`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {currentMembers.map((member, i) => (
                <div 
                  key={member.id || i} 
                  className="member-card flex bg-white border border-[#EAF6E3] overflow-hidden rounded-lg" 
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="w-1/3 h-full overflow-hidden">
                    <img 
                      src={getImageUrl(member.image)} 
                      className="w-full h-full object-cover" 
                      alt={member.name}
                      onError={(e) => { e.target.src = '/images/default-profile.png'; }}
                    />
                  </div>
                  <div className="w-2/3 p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#2C3E2B]">{member.name}</h4>
                      <span className="text-[#667A62] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                        {member.role || member.position}
                      </span>
                      <p className="text-gray-500 text-[11px] line-clamp-3 leading-relaxed mb-2">
                        {member.bio || "Board member dedicated to community development"}
                      </p>
                      {member.email && (
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                          <FiMail size={10} /> {member.email}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 pt-3">
                      {member.email && (
                        <a href={`mailto:${member.email}`}>
                          <FiMail className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <FiLinkedin className="text-gray-300 hover:text-[#667A62] cursor-pointer transition-colors" size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default BoardManagement;