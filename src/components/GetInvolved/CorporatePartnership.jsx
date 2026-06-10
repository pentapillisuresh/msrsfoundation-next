"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  FiBriefcase, FiTrendingUp, FiShield, FiUsers, FiBarChart2, 
  FiTarget, FiAward, FiGlobe, FiCheckCircle, FiClock, FiArrowRight,
  FiHeart, FiStar, FiThumbsUp, FiSmile, FiDollarSign, FiMapPin,
  FiCalendar, FiMessageCircle, FiHome, FiBookOpen
} from 'react-icons/fi';
import { FaHandshake, FaChartLine, FaUserTie, FaTree, FaSchool, FaHospitalUser } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CorporatePartnership = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const benefits = [
    { 
      icon: <FiBriefcase />, 
      title: "CSR Compliance", 
      description: "100% compliant with Schedule VII activities with complete documentation", 
      detail: "Audit-ready reports & certifications"
    },
    { 
      icon: <FaChartLine />, 
      title: "Brand Enhancement", 
      description: "Positive brand association and enhanced corporate image", 
      detail: "Recognition across all platforms"
    },
    { 
      icon: <FiShield />, 
      title: "Risk Management", 
      description: "Professional project execution with regular audits", 
      detail: "Third-party impact assessments"
    },
    { 
      icon: <FiUsers />, 
      title: "Employee Engagement", 
      description: "Meaningful volunteering opportunities for employees", 
      detail: "Team building & satisfaction"
    }
  ];

  const partnershipModels = [
    { 
      title: "Project Funding", 
      description: "Direct funding for specific projects aligned with your CSR goals", 
      icon: <FiTarget />,
      features: ["Customized project design", "Quarterly progress reports", "Regular site visits", "Impact documentation"],
      popular: true
    },
    { 
      title: "Adopt a Village", 
      description: "Comprehensive development of a village or community", 
      icon: <FiHome />,
      features: ["Holistic development approach", "3-5 year commitment", "Measurable outcomes", "Community engagement"],
      popular: false
    },
    { 
      title: "Employee Giving", 
      description: "Payroll giving and employee matching programs", 
      icon: <FiUsers />,
      features: ["Tax benefits for employees", "Easy implementation", "Monthly reporting", "Employee satisfaction"],
      popular: false
    },
    { 
      title: "Cause Marketing", 
      description: "Percentage of sales donated to social causes", 
      icon: <FaChartLine />,
      features: ["Brand alignment", "Customer loyalty", "Social impact metrics", "Marketing support"],
      popular: true
    }
  ];

  const focusAreas = [
    { icon: <FaSchool />, title: "Education", description: "Digital classrooms, scholarships, teacher training" },
    { icon: <FaHospitalUser />, title: "Healthcare", description: "Mobile clinics, health camps, telemedicine" },
    { icon: <FaTree />, title: "Environment", description: "Tree plantation, water conservation, sustainability" },
    { icon: <FaUserTie />, title: "Women Empowerment", description: "Skill development, entrepreneurship, financial literacy" }
  ];

  const process = [
    { step: "01", title: "Initial Meeting", description: "Discuss goals & expectations", icon: <FiMessageCircle /> },
    { step: "02", title: "Proposal", description: "Customized project proposal", icon: <FiTarget /> },
    { step: "03", title: "Agreement", description: "Sign MOU & compliance", icon: <FaHandshake /> },
    { step: "04", title: "Implementation", description: "Project execution & reporting", icon: <FiTrendingUp /> }
  ];

  const testimonials = [
    {
      company: "Tech Mahindra Foundation",
      name: "CSR Director",
      quote: "MSRS Foundation has been an exceptional partner in our education initiatives. Their transparency and impact measurement are outstanding.",
      contribution: "₹2.5 Cr",
      impact: "10,000+ students benefited"
    },
    {
      company: "HDFC Bank",
      name: "Head - CSR",
      quote: "Working with MSRS Foundation has transformed our rural development programs. Their on-ground execution is exemplary.",
      contribution: "₹3.2 Cr",
      impact: "25 villages transformed"
    }
  ];

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }

        .premium-gradient-text {
          background: linear-gradient(to right, #2C3E2B, #667A62, #8A9A87);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .benefit-card, .model-card, .focus-card {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        /* Hover effect - Background changes to dark green like About Us page */
        .benefit-card:hover, .model-card:hover, .focus-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.15);
          background-color: #2C3E2B;
        }
        
        /* Icon background and color change on hover */
        .benefit-card:hover .icon-wrapper,
        .model-card:hover .icon-wrapper,
        .focus-card:hover .icon-wrapper {
          background-color: white;
        }
        
        .benefit-card:hover .icon-wrapper svg,
        .model-card:hover .icon-wrapper svg,
        .focus-card:hover .icon-wrapper svg {
          color: #2C3E2B;
        }
        
        /* Text color change on hover */
        .benefit-card:hover h3,
        .model-card:hover h3,
        .focus-card:hover h3 {
          color: white;
        }
        
        .benefit-card:hover p,
        .model-card:hover p,
        .focus-card:hover p {
          color: #EAF6E3;
        }
        
        .benefit-card:hover .detail-text,
        .model-card:hover .detail-text {
          color: #8A9A87;
        }
        
        .benefit-card:hover .feature-text,
        .model-card:hover .feature-text {
          color: #EAF6E3;
        }
        
        /* Check icon color change on hover */
        .benefit-card:hover .check-icon,
        .model-card:hover .check-icon {
          color: white;
        }
        
        /* Border color change on hover */
        .benefit-card:hover, .model-card:hover, .focus-card:hover {
          border-color: #2C3E2B;
        }
        
        .stat-card {
          transition: all 0.4s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-card .stat-icon {
          transition: all 0.4s ease;
        }
        
        .stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .process-step {
          transition: all 0.4s ease;
        }
        
        .process-step:hover {
          transform: translateY(-5px);
        }
        
        .testimonial-card {
          transition: all 0.4s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.1);
        }
        
        .stagger-border {
          position: relative;
        }
        .stagger-border::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: -20px;
          bottom: -20px;
          border: 2px solid #667A62;
          z-index: -1;
          transition: all 0.5s ease;
        }
        .stagger-border:hover::after {
          top: 10px;
          left: 10px;
          right: -10px;
          bottom: -10px;
        }

        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Corporate Partnership Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              COLLABORATE FOR CHANGE
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Corporate Partnership
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Collaborate with us for meaningful CSR initiatives that create lasting impact.
            Together, we can transform communities and build a better tomorrow.
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <Link href="/schedule-meeting" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md">
              Partner With Us <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- WHY PARTNER WITH US SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              WHY CHOOSE US
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Why Partner With Us?
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Join hands with MSRS Foundation for structured, high-impact, and compliant social programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="benefit-card bg-white p-6 shadow-sm border border-[#EAF6E3]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="icon-wrapper w-12 h-12 bg-[#EAF6E3] flex items-center justify-center mb-4 transition-colors duration-300">
                  <div className="text-xl text-[#667A62] transition-colors duration-300">{benefit.icon}</div>
                </div>
                <h3 className="font-bold text-[#2C3E2B] text-base mb-2 transition-colors duration-300">{benefit.title}</h3>
                <p className="text-[#4A5C46] text-sm leading-relaxed mb-3 transition-colors duration-300">{benefit.description}</p>
                <div className="flex items-center gap-1 text-[#667A62] text-[10px] font-semibold">
                  <FiCheckCircle className="check-icon transition-colors duration-300" size={10} /> 
                  <span className="detail-text transition-colors duration-300">{benefit.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOCUS AREAS SECTION --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              OUR EXPERTISE
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Focus Areas
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              We specialize in these key areas aligned with Schedule VII of Companies Act
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, idx) => (
              <div 
                key={idx} 
                className="focus-card bg-white p-6 text-center shadow-sm border border-[#EAF6E3]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="icon-wrapper w-14 h-14 bg-[#EAF6E3] flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <div className="text-xl text-[#667A62] transition-colors duration-300">{area.icon}</div>
                </div>
                <h3 className="font-bold text-[#2C3E2B] text-base mb-2 transition-colors duration-300">{area.title}</h3>
                <p className="text-[#4A5C46] text-xs leading-relaxed transition-colors duration-300">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARTNERSHIP MODELS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              FLEXIBLE OPTIONS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Partnership Models
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Choose the model that best aligns with your corporate goals and CSR objectives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnershipModels.map((model, idx) => (
              <div 
                key={idx} 
                className="model-card bg-white p-6 shadow-sm border border-[#EAF6E3] relative"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {model.popular && (
                  <div className="absolute top-4 right-4 bg-[#667A62] px-2 py-0.5 transition-colors duration-300">
                    <span className="text-white text-[9px] font-semibold uppercase">Popular</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-wrapper w-10 h-10 bg-[#EAF6E3] flex items-center justify-center transition-colors duration-300">
                    <div className="text-lg text-[#667A62] transition-colors duration-300">{model.icon}</div>
                  </div>
                  <h3 className="font-bold text-[#2C3E2B] text-lg transition-colors duration-300">{model.title}</h3>
                </div>
                <p className="text-[#4A5C46] text-sm mb-4 leading-relaxed transition-colors duration-300">{model.description}</p>
                <div className="space-y-2">
                  {model.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <FiCheckCircle className="check-icon text-[#667A62] text-[10px] transition-colors duration-300" />
                      <span className="feature-text text-[#4A5C46] text-xs transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION WITH CONNECTING LINES --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              SIMPLE PROCESS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              How to Partner With Us
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              A streamlined process to get started with your CSR partnership
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/3 left-[8%] right-[8%] h-px border-t-2 border-dashed border-[#667A62] opacity-30 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {process.map((item, idx) => (
                <div 
                  key={idx} 
                  className="process-step text-center group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#667A62] transition-all duration-300">
                      <div className="text-xl text-[#667A62] group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#667A62] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-bold text-[#2C3E2B] text-base mb-2">{item.title}</h4>
                  <p className="text-[#4A5C46] text-xs">{item.description}</p>
                  
                  {idx < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/3 -right-4 transform -translate-y-1/2">
                      <FiArrowRight className="text-[#667A62] opacity-30" size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              SUCCESS STORIES
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              What Our Partners Say
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Hear from our corporate partners about their experience working with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="testimonial-card bg-[#F7F9F5] p-6 border border-[#EAF6E3] hover:bg-[#2C3E2B] transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-[#667A62] text-3xl font-serif transition-colors duration-300">"</div>
                  <div className="flex text-yellow-500 text-xs">
                    <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                  </div>
                </div>
                <p className="text-[#4A5C46] text-sm leading-relaxed mb-5 italic transition-colors duration-300 hover:text-white">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-[#EAF6E3] pt-4 transition-colors duration-300 hover:border-white/20">
                  <h4 className="font-bold text-[#2C3E2B] text-base transition-colors duration-300 hover:text-white">{testimonial.company}</h4>
                  <p className="text-[#667A62] text-xs mb-2 transition-colors duration-300 hover:text-[#8A9A87]">{testimonial.name}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="text-[#2C3E2B] font-semibold transition-colors duration-300 hover:text-white">Contribution: {testimonial.contribution}</span>
                    <span className="text-[#667A62] transition-colors duration-300 hover:text-white/60">|</span>
                    <span className="text-[#2C3E2B] font-semibold transition-colors duration-300 hover:text-white">Impact: {testimonial.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#6F8770] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Ready to Make a Difference Together?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Let's collaborate for a better tomorrow. Our CSR team will respond within 24 hours.
              </p>
              <p className="text-white/60 text-xs mt-2">
                We'll respond within 24 hours to discuss potential collaboration
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Link 
                href="/schedule-meeting" 
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Schedule a Meeting 
                <FiCalendar className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
              <Link 
                href="/get-in-touch" 
                className="px-5 py-2.5 border border-white text-white font-semibold text-sm rounded-md hover:bg-white hover:text-[#2C3E2B] transition-all duration-300"
              >
                Contact CSR Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporatePartnership;