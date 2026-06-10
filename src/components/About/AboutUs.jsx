"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  FiShield, FiHeart, FiGlobe, FiTrendingUp, FiUsers, 
  FiBookOpen, FiMapPin, FiArrowRight, FiChevronRight, 
  FiAward, FiActivity, FiZap, FiCheckCircle 
} from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const values = [
    { icon: <FiShield />, title: 'Ethical Governance', description: 'Upholding the highest benchmarks of transparency and integrity in every initiative.', delay: 100 },
    { icon: <FiHeart />, title: 'Human-Centric', description: 'Empowering communities through empathy, ensuring every individual is treated with honor.', delay: 200 },
    { icon: <FiGlobe />, title: 'Global Stewardship', description: 'Pioneering sustainable practices that protect our environment while elevating society.', delay: 300 },
    { icon: <FiZap />, title: 'Dynamic Innovation', description: 'Utilizing cutting-edge AI and technology to solve age-old social disparities.', delay: 400 },
  ];



  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
          
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Mulish', sans-serif; }

          .premium-gradient-text {
            background: linear-gradient(to right, #2C3E2B, #667A62, #8A9A87);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .image-mask {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
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
        `}
      </style>

      {/* --- HERO SECTION (Reduced Height) --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/about1.jpg" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
               ABOUT US
            </span>
          </div>
          <h1 className=" text-white text-3xl md:text-3xl lg:text-5xl mb-4" data-aos="fade-up" data-aos-delay="200">
            Purpose-Driven. Impact-Focused.
          </h1>
          <p className="text-white/80 font-sans text-base md:text-md max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            We are a Section 8 organization committed to social development through structured programs, transparency, and long-term impact across communities.
          </p>
         
        </div>
      </section>

      {/* --- VISION & MISSION: REDUCED HEIGHT SECTION --- */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5" data-aos="fade-right">
              <div className="stagger-border">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
                  className="w-full h-[450px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" 
                  alt="Organization"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <div data-aos="fade-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[2px] bg-[#667A62]"></div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B]">Our Vision</h2>
                </div>
                <p className="text-[#4A5C46] text-lg leading-relaxed font-light">
                  To architect a future where institutional barriers to health and education are dismantled, 
                  allowing the human spirit to thrive in an environment of absolute <b>equity and respect.</b>
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[2px] bg-[#667A62]"></div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B]">Our Mission</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 border-l-2 border-[#667A62] bg-white shadow-sm">
                    <h4 className="font-bold text-[#2C3E2B] mb-2 uppercase text-xs tracking-widest">Sustainability</h4>
                    <p className="text-sm text-gray-600">Developing self-sustaining community models that thrive beyond our presence.</p>
                  </div>
                  <div className="p-5 border-l-2 border-[#667A62] bg-white shadow-sm">
                    <h4 className="font-bold text-[#2C3E2B] mb-2 uppercase text-xs tracking-widest">Integrity</h4>
                    <p className="text-sm text-gray-600">Transparent financial and operational reporting to maintain stakeholder trust.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

  

      {/* --- CORE VALUES: THE GRID OF EXCELLENCE --- */}
      <section className="py-32 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              OUR CORE PHILOSOPHY
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <p className="text-gray-500 mt-4 tracking-widest  text-sm">Principles That Guide Our Impact</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="glass-card p-10 hover:bg-[#2C3E2B] group transition-all duration-500 cursor-default"
                data-aos="fade-up"
                data-aos-delay={v.delay}
              >
                <div className="w-12 h-12 bg-[#667A62] text-white rounded-lg flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-[#2C3E2B] transition-colors duration-500">
                  {v.icon}
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#2C3E2B] group-hover:text-white transition-colors">{v.title}</h3>
                <p className="text-gray-600 group-hover:text-white/70 transition-colors leading-relaxed font-light">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER SECTION: MESSAGE FROM DIRECTOR (Reduced Height & Justified Content) --- */}
      <section className="py-24 ">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#2C3E2B] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-2/5 relative h-[450px] lg:h-auto">
              <img 
                src="./images/profilepic3.jpg" 
                className="w-full h-full object-cover" 
                alt="Founder" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3E2B]/40" />
            </div>
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <FiCheckCircle className="text-white/20 text-5xl mb-5" />
              <h2 className="font-serif text-3xl lg:text-4xl text-white mb-1">Srinivasa Sai Kavali</h2>
              <p className="text-[#8A9A87] font-bold uppercase tracking-widest text-[10px] mb-5">Founder & Executive Director</p>
              
              <div>
                <h3 className="text-white/90 font-serif text-xl mb-3 italic">Message from the Director</h3>
                <div className="space-y-3 text-white/70 text-xs leading-relaxed text-justify">
                  <p>
                    At MSRS Foundation, our commitment is grounded in building a structured, transparent, and impact-driven institution that responds effectively to evolving societal needs. We believe that meaningful change is achieved not only through intent, but through disciplined execution, measurable outcomes, and accountable governance.
                  </p>
                  <p>
                    From the outset, our focus has been on designing scalable initiatives that create long-term value across communities. By aligning our programs with national priorities and sustainable development frameworks, we strive to ensure that every intervention delivers tangible and lasting impact.
                  </p>
                  <p>
                    Our approach emphasizes strong systems, data-driven decision-making, and collaborative partnerships. We actively engage with stakeholders, institutions, and communities to create solutions that are both practical and sustainable. This integrated model allows us to expand our reach while maintaining the highest standards of operational excellence.
                  </p>
                  <p>
                    As we continue to grow, our vision remains clear—to establish MSRS Foundation as a trusted and high-performing organization that sets benchmarks in the social sector. We are dedicated to fostering innovation, strengthening governance, and delivering initiatives that contribute to inclusive growth and societal progress.
                  </p>
                  <p>
                    I extend my sincere gratitude to our partners, supporters, and volunteers whose continued trust and collaboration drive our mission forward.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4 mt-4">
                <p className="text-white font-serif text-lg">Srinivasa Sai Kavali</p>
                <p className="text-[#8A9A87] text-[9px] tracking-wide uppercase mt-1">Founder & Director<br />Maha Shree Rudra Samsthanam Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* --- PREMIUM CTA SECTION (NO IMAGE) --- */}
<section className="py-20">
  <div className="container mx-auto px-6">
    
    {/* BOX */}
    <div className="bg-[#6F8770]  px-8 md:px-16 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      {/* LEFT CONTENT */}
      <div className="max-w-2xl text-center lg:text-left">
        <h2 className="font-serif text-white text-3xl md:text-4xl leading-snug mb-5">
          Ready to make a lasting difference?
        </h2>

        <p className="text-white/80 text-base md:text-lg leading-relaxed">
          Join our network of volunteers who are redefining social impact.
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex flex-wrap justify-center lg:justify-end gap-5">
        
        <Link 
       href="/donate"
          className="group flex items-center gap-3 px-8 py-4 bg-white text-[#2C3E2B] font-bold rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
        >
          Become a Donate 
          <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>

        <Link 
        href="/contact"
          className="px-8 py-4 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#2C3E2B] transition-all duration-300"
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

export default AboutUs;