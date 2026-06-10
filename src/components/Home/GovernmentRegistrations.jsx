import React from 'react';

const credentials = [
  {
    id: 1,
    title: "12A Certified",
    subtitle: "Income tax exemption for the organization, enabling sustainable growth and impact.",
    image: "/images/12a.svg",
  },
  {
    id: 2,
    title: "80G Approved",
    subtitle: "Donors receive tax benefits, encouraging more contributions towards social change.",
    image: "/images/80g.svg",
  },
  {
    id: 3,
    title: "CSR Registered Entity",
    subtitle: "Eligible to receive Corporate Social Responsibility (CSR) funds from companies across India.",
    image: "/images/csr.svg",
  },
  {
    id: 4,
    title: "DARPAN ID Verified",
    subtitle: "Officially listed and verified under NITI Aayog NGO portal, ensuring authenticity.",
    image: "/images/darpan.svg",
  },
  {
    id: 5,
    title: "ISO 9001:2015 Certified",
    subtitle: "Internationally recognized quality management standard, ensuring operational excellence and continuous improvement.",
    image: "/images/iso.svg",
  },
  {
    id: 6,
    title: "MSME Registered",
    subtitle: "Recognized under Micro, Small & Medium Enterprises, enhancing operational benefits and support.",
    image: "/images/msme.svg",
  },
  {
    id: 7,
    title: "PAN & TAN Registered",
    subtitle: "Fully compliant with financial and taxation regulations for smooth operations.",
    image: "/images/pan-tan.svg",
  },
  {
    id: 8,
    title: "Startup India Recognized",
    subtitle: "Aligned with the flagship initiative of Startup India, promoting innovation-driven impact.",
    image: "/images/startup-india.svg",
  },
  {
    id: 9,
    title: "Transparent Governance",
    subtitle: "Committed to ethical practices, financial clarity, and measurable impact.",
    image: "/images/governance.svg",
  },
];

const GovernmentRegistrations = () => {
  return (
    <section 
      className="py-24 font-sans overflow-hidden relative"
      style={{
        backgroundImage: 'url("./images/docu.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* Dark overlay for white text visibility - matching Key Highlights */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[5px] text-[#EAF3E6] font-semibold mb-3 inline-block uppercase">
            Recognized & Certified by Government Authorities of India
          </span>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-[#EAF3E6]"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
           Building Trust Through Certified Processes and Responsible Governance
          </p>
        </div>

        {/* Grid - Updated with glass morphism effect matching Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="
                group
                relative
                bg-white/15 
                backdrop-blur-md 
                rounded-2xl 
                p-6
                transition-all 
                duration-500 
                hover:transform 
                hover:-translate-y-2 
                hover:bg-white/25 
                border 
                border-white/30
                flex flex-col
                h-full
                shadow-md
              "
            >
              {/* Premium glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(234, 243, 230, 0.2), transparent 70%)",
                }}
              ></div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 transition-colors duration-300">
                {cred.title}
              </h3>

              {/* Subtitle */}
              <p className="text-[13px] text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                {cred.subtitle}
              </p>
              
              {/* Subtle Decorative Line - Matching Key Highlights */}
              <div className="mt-4 w-12 h-0.5 bg-[#EAF3E6] rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentRegistrations;