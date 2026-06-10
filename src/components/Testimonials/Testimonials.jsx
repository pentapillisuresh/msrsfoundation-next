import React, { useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    // 1. Beneficiary Testimonials (Education & Empowerment)
    {
      id: 1,
      name: "Student Transformation",
      role: "Education Beneficiary",
      category: "Education & Empowerment",
      rating: 5,
      text: "MSRS Foundation has completely transformed my life. Coming from a financially weak background, I never thought I could continue my education. Today, I am confidently pursuing my studies with their support. They didn't just help me financially—they gave me hope and direction."
    },
    {
      id: 2,
      name: "Skill Development Trainee",
      role: "Vocational Graduate",
      category: "Education & Empowerment",
      rating: 5,
      text: "Before joining the MSRS training program, I had no skills or confidence. Today, I am earning independently and supporting my family. I will always be grateful to the foundation for empowering me."
    },
    // 2. Community & Social Impact Testimonials
    {
      id: 3,
      name: "Village Resident",
      role: "Rural Development",
      category: "Community Impact",
      rating: 5,
      text: "Our village has seen a big change because of MSRS Foundation. From education awareness to health camps, they are always there for us. They treat us like family, not beneficiaries."
    },
    {
      id: 4,
      name: "Women Entrepreneur",
      role: "Self-Help Group",
      category: "Women Empowerment",
      rating: 5,
      text: "MSRS Foundation gave me the courage to stand on my own feet. Through their support, I started my small business and now I am financially independent."
    },
    // 3. Goshala Seva Testimonials
    {
      id: 5,
      name: "Devotee",
      role: "Goshala Supporter",
      category: "Goshala Seva",
      rating: 5,
      text: "MSRS Foundation's commitment towards Goshala seva is truly divine. The way they care for cows with dedication and devotion reflects their spiritual values. Supporting them feels like contributing to a sacred cause."
    },
    // 4. Infrastructure & Development Testimonials
    {
      id: 6,
      name: "Project Partner",
      role: "Infrastructure Development",
      category: "Infrastructure",
      rating: 5,
      text: "We partnered with MSRS Foundation for infrastructure development, and the execution was highly professional. Their transparency, planning, and commitment to quality are commendable."
    },
    // 5. CSR Partner Testimonials
    {
      id: 7,
      name: "CSR Director",
      role: "Corporate Collaboration",
      category: "CSR Partnership",
      rating: 5,
      text: "Working with MSRS Foundation has been a seamless and impactful experience. Their structured approach, compliance, and reporting make them a reliable CSR partner."
    },
    {
      id: 8,
      name: "CSR Head",
      role: "Corporate Partner",
      category: "CSR Partnership",
      rating: 5,
      text: "We appreciate the transparency and accountability maintained by MSRS Foundation. Every contribution is utilized effectively, creating measurable social impact."
    },
    // 6. Donor Testimonials
    {
      id: 9,
      name: "Individual Donor",
      role: "Contributor",
      category: "Donor",
      rating: 5,
      text: "Donating to MSRS Foundation gives me a sense of fulfillment. I trust that my contributions are reaching the right people and making a real difference."
    },
    {
      id: 10,
      name: "Monthly Donor",
      role: "Recurring Contributor",
      category: "Donor",
      rating: 5,
      text: "Being a monthly donor to MSRS Foundation has been a rewarding journey. Their consistent updates and impact stories keep me connected to the cause."
    },
    // 7. Volunteer & Internship Testimonials
    {
      id: 11,
      name: "Volunteer",
      role: "Social Service",
      category: "Volunteer",
      rating: 5,
      text: "Volunteering with MSRS Foundation was a life-changing experience. It gave me a chance to contribute to society and understand real-world challenges."
    },
    {
      id: 12,
      name: "Intern",
      role: "Former Intern",
      category: "Internship",
      rating: 5,
      text: "My internship at MSRS Foundation helped me grow both personally and professionally. The team is supportive, and the work is truly meaningful."
    },
    // 8. Spiritual & Cultural Testimonials
    {
      id: 13,
      name: "Spiritual Seeker",
      role: "Devotee",
      category: "Spiritual & Cultural",
      rating: 5,
      text: "MSRS Foundation beautifully combines spirituality with social service. Their initiatives inspired by Lord Shiva and Mata Durga create a unique path of serving humanity with devotion."
    },
    // 9. General Impact Testimonials
    {
      id: 14,
      name: "Community Leader",
      role: "Social Activist",
      category: "General Impact",
      rating: 5,
      text: "MSRS Foundation is not just an organization—it is a mission to uplift lives. Their dedication, integrity, and vision make them a trustworthy institution for social change."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animated, setAnimated] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials (3 at a time for desktop)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      let index = (currentIndex + i + testimonials.length) % testimonials.length;
      items.push({ ...testimonials[index], position: i });
    }
    return items;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-6 overflow-hidden relative"
      style={{
        backgroundImage: 'url("./images/esg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better white text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
          
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Mulish', sans-serif; }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-80px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(80px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInCenter {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .testimonial-card-left {
            animation: slideInLeft 0.6s ease forwards;
          }
          
          .testimonial-card-center {
            animation: slideInCenter 0.6s ease forwards;
          }
          
          .testimonial-card-right {
            animation: slideInRight 0.6s ease forwards;
          }
          
          .testimonial-card {
            transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            backdrop-filter: blur(10px);
          }
          
          .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          
          .carousel-container {
            overflow: hidden;
            position: relative;
          }
          
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[5px] text-[#EAF3E6] font-semibold mb-3 inline-block uppercase">
            Testimonials
          </span>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#EAF3E6]"></div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-4 mb-3">
            What People Say About Us
          </h2>
          
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Real stories from our beneficiaries, partners, donors, and volunteers
          </p>
        </div>

        {/* Horizontal Auto Carousel */}
        <div className="relative px-4 md:px-12">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#667A62] hover:border-[#667A62] transition-all duration-300 shadow-lg"
          >
            <FaChevronLeft size={16} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#667A62] hover:border-[#667A62] transition-all duration-300 shadow-lg"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Cards Container - Horizontal Carousel */}
          <div className="carousel-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, idx) => {
                let cardClass = "testimonial-card-center";
                if (testimonial.position === -1) cardClass = "testimonial-card-left";
                if (testimonial.position === 1) cardClass = "testimonial-card-right";
                
                // For mobile, only show center card
                if (typeof window !== 'undefined' && window.innerWidth < 768 && testimonial.position !== 0) {
                  return null;
                }
                
                return (
                  <div 
                    key={testimonial.id}
                    className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 testimonial-card ${cardClass} ${testimonial.position === 0 ? 'md:scale-105 md:shadow-2xl' : 'md:opacity-80'} transition-all duration-700 ease-out ${
                      animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <FaQuoteLeft className="text-white/40 text-3xl" />
                    </div>
                    
                    {/* Category Badge - White text */}
                    <div className="inline-block mb-3 px-2 py-0.5 bg-white/20 rounded-full">
                      <span className="text-[8px] font-semibold text-white uppercase tracking-wider">
                        {testimonial.category}
                      </span>
                    </div>
                    
                    {/* Testimonial Text - White */}
                    <p className="text-white text-sm leading-relaxed mb-5 italic line-clamp-4">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Rating Stars - White with green accent */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-white/80 text-sm" />
                      ))}
                    </div>
                    
                    {/* User Info - All White */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <FaUserCircle className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                        <p className="text-white/60 text-[9px]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Auto-Slide Indicator - Progress Bar */}
        <div className="flex justify-center mt-10">
          <div className="w-48 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full transition-all duration-100"
              style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl floating"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Testimonials;