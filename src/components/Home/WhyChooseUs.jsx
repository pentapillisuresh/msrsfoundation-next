import React, { useEffect, useState, useRef } from "react";

const WorkingProcess = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

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

  const processes = [
    {
      id: "01",
      title: "Transparent Fund Utilization",
      desc: "Every rupee is tracked and reported with full transparency.",
      icon: "./images/fund1.png",
    },
    {
      id: "02",
      title: "Real-Time Project Reporting",
      desc: "Live updates and detailed reports on project progress.",
      icon: "./images/project1.png",
    },
    {
      id: "03",
      title: "Government Compliant Operations",
      desc: "Strict adherence to CSR laws and compliance standards.",
      icon: "./images/business.png",
    },
    {
      id: "04",
      title: "High Impact ROI for CSR Investors",
      desc: "Maximize measurable social impact for every investment.",
      icon: "./images/investor.png",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-6 overflow-hidden relative"
      style={{
        backgroundImage: 'url("./images/csr.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better white text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[5px] text-[#EAF3E6] font-semibold mb-3 inline-block uppercase">
            Why Choose Us
          </span>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#EAF3E6]"></div>
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Trusted partner for CSR funding with complete transparency and measurable impact
          </p>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="relative">
          
          {/* Connecting Line */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-white/20 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {[...processes]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((step, index) => (
                <div 
                  key={index} 
                  className={`relative text-center transition-all duration-700 ease-out ${
                    animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative z-10 mb-8 group">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex flex-col items-center justify-center group-hover:border-white group-hover:bg-white/20 transition-all duration-300 shadow-md">
                      <img 
                        src={step.icon} 
                        alt={step.title}
                        className="w-10 h-10 object-contain mb-1 filter brightness-0 invert"
                      />
                      <span className="text-white text-[10px] font-bold tracking-tighter">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {index < processes.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 text-white/30 z-20">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <h3 className="text-white text-base font-bold mb-3 px-4 leading-tight min-h-[40px]">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-xs leading-relaxed max-w-[220px] mx-auto px-2">
                    {step.desc}
                  </p>

                  <div className="mt-6 flex justify-center">
                    <div className="w-6 h-1 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;