"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiHeart, FiUsers, FiGlobe, FiAward, FiClock, FiCheckCircle, 
  FiTrendingUp, FiShield, FiArrowRight, FiDollarSign, FiBookOpen,
  FiSmile, FiStar, FiThumbsUp, FiGift, FiLock, FiMail, FiCalendar,
  FiTarget, FiZap
} from 'react-icons/fi';
import { FaDonate, FaHandHoldingHeart, FaChild, FaFemale, FaTree, FaGraduationCap } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const IndividualSupport = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const handleDonateClick = (amount) => {
    router.push(`/donate?suggestedAmount=${encodeURIComponent(amount)}`);
  };

  const benefits = [
    { icon: <FiShield />, title: "80G Tax Benefits", description: "Get tax exemption on your donations under Section 80G", detail: "Save up to 50% tax" },
    { icon: <FaHandHoldingHeart />, title: "Direct Impact", description: "Your contribution directly reaches those in need", detail: "100% transparency" },
    { icon: <FiGlobe />, title: "Complete Transparency", description: "Regular updates and impact reports", detail: "Quarterly reports" },
    { icon: <FiAward />, title: "Recognition", description: "Certificate of appreciation & donor recognition", detail: "Digital certificate" }
  ];

  const donationWays = [
    { amount: "₹1,000", impact: "Educational materials for 5 children", icon: <FaGraduationCap /> },
    { amount: "₹5,000", impact: "Support a child's education for 3 months", icon: <FaChild /> },
    { amount: "₹10,000", impact: "Sponsor a medical camp for 100 people", icon: <FaHandHoldingHeart /> },
    { amount: "₹25,000", impact: "Support women entrepreneurship training", icon: <FaFemale /> }
  ];

  const process = [
    { step: "01", title: "Choose Amount", description: "Select any amount you wish to contribute", icon: <FiDollarSign /> },
    { step: "02", title: "Make Payment", description: "Secure online payment with multiple options", icon: <FiLock /> },
    { step: "03", title: "Get Certificate", description: "Receive 80G certificate instantly", icon: <FiAward /> },
    { step: "04", title: "Track Impact", description: "Regular updates on your contribution", icon: <FiTrendingUp /> }
  ];

  const impactStories = [
    {
      name: "Rajesh Sharma",
      amount: "₹50,000",
      text: "Proud to support MSRS Foundation. Their transparency and impact reporting is exceptional! Seeing the transformation in children's lives is truly rewarding.",
      location: "Mumbai, India"
    },
    {
      name: "Priya Mehta",
      amount: "₹25,000",
      text: "The best decision I made this year. Seeing the smiles on children's faces is priceless. MSRS Foundation ensures every rupee reaches the right hands.",
      location: "Delhi, India"
    }
  ];

  const projectsYouSupport = [
    { title: "Education for All", icon: <FaGraduationCap />, impact: "500+ children educated" },
    { title: "Healthcare Access", icon: <FaHandHoldingHeart />, impact: "10,000+ patients treated" },
    { title: "Women Empowerment", icon: <FaFemale />, impact: "2,000+ women trained" },
    { title: "Environmental Care", icon: <FaTree />, impact: "5,000+ trees planted" }
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

        .benefit-card, .donation-card {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          position: relative;
          overflow: hidden;
        }
        
        .benefit-card:hover, .donation-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
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
          position: relative;
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

        /* Connecting line animation */
        .connecting-line {
          position: absolute;
          top: 40px;
          height: 2px;
          background-color: #667A62;
          opacity: 0.3;
          z-index: 0;
        }

        @keyframes linePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .process-container:hover .connecting-line {
          animation: linePulse 1.5s ease-in-out infinite;
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
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Individual Support Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              EVERY CONTRIBUTION MATTERS
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Individual Support
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Support our mission through donations and help us create meaningful change in society.
            Your contribution, no matter the size, makes a lasting impact.
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <Link href="/donate" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md">
              Donate Now <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- WHY DONATE SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <div data-aos="fade-right">
              <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
                WHY DONATE
              </span>
              <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E2B] mb-5 leading-tight">
                Why Donate to <br />MSRS Foundation?
              </h2>
              <p className="text-[#4A5C46] text-base mb-8 leading-relaxed">
                Your generous contribution helps us continue our mission of creating sustainable social impact 
                across communities. Every donation, big or small, makes a difference in someone's life.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="benefit-card bg-white p-5 flex gap-4 shadow-sm border border-[#EAF6E3]"
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <div className="w-12 h-12 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                      <div className="text-xl text-[#667A62]">{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3E2B] text-base mb-1">{benefit.title}</h3>
                      <p className="text-[#4A5C46] text-sm leading-relaxed">{benefit.description}</p>
                      <span className="text-[10px] text-[#667A62] font-semibold mt-1 inline-block">{benefit.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Impact Calculator with Donate Navigation */}
            <div data-aos="fade-left">
              <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
                IMPACT CALCULATOR
              </span>
              <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E2B] mb-5 leading-tight">
                Impact of Your <br />Contribution
              </h2>
              
              <div className="space-y-3">
                {donationWays.map((way, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleDonateClick(way.amount)}
                    className="donation-card bg-white p-4 flex items-center justify-between shadow-sm border border-[#EAF6E3] cursor-pointer group"
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EAF6E3] flex items-center justify-center">
                        <div className="text-lg text-[#667A62]">{way.icon}</div>
                      </div>
                      <div>
                        <span className="text-xl font-bold text-[#2C3E2B]">{way.amount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4A5C46] text-sm">{way.impact}</span>
                      <FiArrowRight className="text-[#667A62] text-sm opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" size={12} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects You Support */}
              <div className="mt-8">
                <h3 className="font-bold text-[#2C3E2B] text-base mb-4">Projects You Support</h3>
                <div className="grid grid-cols-2 gap-3">
                  {projectsYouSupport.map((project, idx) => (
                    <div key={idx} className="bg-[#F7F9F5] p-3 text-center border border-[#EAF6E3] hover:border-[#667A62] transition-all">
                      <div className="text-xl text-[#667A62] mb-2">{project.icon}</div>
                      <h4 className="font-semibold text-[#2C3E2B] text-xs">{project.title}</h4>
                      <p className="text-[10px] text-[#667A62] mt-1">{project.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION WITH CONNECTING LINES --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              SIMPLE PROCESS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              How It Works
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Making a difference is just a few clicks away
            </p>
          </div>
          
          <div className="relative process-container">
            {/* Connecting Line - Visible on desktop */}
            <div className="hidden md:block connecting-line" style={{ left: '12.5%', right: '12.5%', width: '75%' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {process.map((item, idx) => (
                <div 
                  key={idx} 
                  className="process-step text-center group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#667A62] transition-all duration-300 relative z-10">
                      <div className="text-xl text-[#667A62] group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#667A62] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-20">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-bold text-[#2C3E2B] text-base mb-2">{item.title}</h4>
                  <p className="text-[#4A5C46] text-xs">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile connecting indicators */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            {process.map((_, idx) => (
              <div key={idx} className="w-2 h-2 rounded-full bg-[#667A62] opacity-40"></div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              DONOR STORIES
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              What Our Donors Say
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Hear from our generous donors about their experience supporting our cause
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story, idx) => (
              <div 
                key={idx} 
                className="bg-[#F7F9F5] p-6 testimonial-card border border-[#EAF6E3]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#667A62] flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E2B] text-base">{story.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[#667A62] text-xs font-semibold">Donated: {story.amount}</span>
                      <span className="text-gray-400 text-[10px]">|</span>
                      <span className="text-gray-500 text-[10px]">{story.location}</span>
                    </div>
                  </div>
                  <div className="ml-auto text-yellow-500 flex text-xs">
                    <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                  </div>
                </div>
                <div className="relative">
                  <FiSmile className="absolute -top-2 -left-2 text-[#667A62] opacity-20 text-3xl" />
                  <p className="text-[#4A5C46] text-sm leading-relaxed italic pl-5">"{story.text}"</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAF6E3]">
                  <div className="flex items-center gap-2 text-xs text-[#667A62]">
                    <FiThumbsUp size={12} /> Verified Donor
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
                Ready to Make a Difference?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Your contribution today can change lives tomorrow. Every donation creates lasting impact.
              </p>
              <p className="text-white/60 text-xs mt-2">
                Your donations are eligible for tax exemption under Section 80G
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Link 
                href="/donate" 
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Donate Now 
                <FiHeart className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
              <Link 
                href="/contact" 
                className="px-5 py-2.5 border border-white text-white font-semibold text-sm rounded-md hover:bg-white hover:text-[#2C3E2B] transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualSupport;