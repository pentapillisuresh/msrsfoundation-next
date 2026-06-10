import React, { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const KeyHighlights = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Function to capitalize first letter of each word
const capitalizeEachWord = (text) => {
  return text
    .split(' ')
    .map((word) => {
      // Keep words like CSR-1 unchanged
      if (word === word.toUpperCase()) return word;

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

  const highlights = [
    { title: 'CSR-1 Registered Organization', description: 'Officially Registered For Corporate Social Responsibility Funding' },
    { title: 'Section 8 Company', description: 'Ministry Of Corporate Affairs Registered Foundation Government Of India' },
    { title: 'Multi-Sector Development', description: 'Comprehensive Social Initiatives' },
    { title: 'Nationwide Impact', description: 'Serving Communities Across India' },
  ];

  return (
    <section 
      className="py-24 font-sans overflow-hidden relative"
      style={{
        backgroundImage: 'url("./images/gov.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* Dark overlay for white text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl relative z-10">
        
        {/* Section Header - Centered properly */}
        <div 
          className="mb-16 text-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="text-xs tracking-[5px] text-[#EAF3E6] font-semibold mb-3 inline-block">
            {('KEY HIGHLIGHTS')}
          </span>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#EAF3E6]"></div>
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            {capitalizeEachWord('Recognized excellence and proven track record in comprehensive social development')}
          </p>
        </div>

        {/* Horizontal Cards Layout with equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...highlights]
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white/15 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:transform hover:-translate-y-2 hover:bg-white/25 border border-white/30 flex flex-col h-full shadow-md"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                data-aos-duration="800"
              >
                {/* Premium glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(234, 243, 230, 0.2), transparent 70%)",
                  }}
                ></div>

                <div className="mb-5">
                  <div className="w-14 h-14 rounded-full bg-[#EAF3E6]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#EAF3E6]/40 transition-all duration-300">
                    <FiCheckCircle className="text-2xl text-[#EAF3E6]" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-tight min-h-[56px]">
                  {capitalizeEachWord(item.title)}
                </h3>

                <p className="text-gray-200 text-sm leading-relaxed flex-grow">
                  {capitalizeEachWord(item.description)}
                </p>

                <div className="mt-4 w-12 h-0.5 bg-[#EAF3E6] rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;