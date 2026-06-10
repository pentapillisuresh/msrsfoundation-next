"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiFileText, FiEye, FiCheckCircle, FiArrowRight, FiShield, 
  FiAward, FiTrendingUp, FiUsers, FiGlobe, FiCalendar, 
  FiClock, FiLock, FiCreditCard, FiHome, FiBriefcase, FiX,
  FiPieChart, FiBarChart2, FiDollarSign, FiBookOpen, FiHeart
} from 'react-icons/fi';
import { 
  FaRegFilePdf, FaCertificate, FaShieldAlt, FaChartLine, 
  FaBalanceScale, FaHandHoldingHeart, FaUniversity, FaRegBuilding,
  FaChartPie, FaFileInvoice, FaGavel, FaHandsHelping
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ComplianceGovernance = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const certificatesData = [
    { title: "Certificate of Incorporation", description: "Section 8 Company Registration", date: "2020", size: "245 KB", category: "Legal", imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80" },
    { title: "CSR Registration Certificate", description: "Ministry of Corporate Affairs", date: "2021", size: "189 KB", category: "CSR", imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
    { title: "12A Registration Certificate", description: "Income Tax Department", date: "2020", size: "156 KB", category: "Tax", imageUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80" },
    { title: "80G Registration Certificate", description: "Income Tax Department", date: "2020", size: "178 KB", category: "Tax", imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80" },
    { title: "NITI Aayog Registration", description: "Government of India", date: "2020", size: "134 KB", category: "Government", imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
    { title: "PAN Card", description: "Permanent Account Number", date: "2020", size: "98 KB", category: "Legal", imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80" }
  ];

  const governanceStructure = [
    {
      title: "Board of Directors",
      description: "Our board provides strategic direction and oversight",
      responsibilities: [
        "Strategic planning and policy formulation",
        "Financial oversight and budget approval",
        "Ensuring legal and regulatory compliance",
        "Appointment of key management personnel"
      ],
      icon: <FaUniversity />
    },
    {
      title: "Executive Committee",
      description: "Day-to-day management and implementation",
      responsibilities: [
        "Implementation of board decisions",
        "Program management and execution",
        "Resource allocation and monitoring",
        "Stakeholder relationship management"
      ],
      icon: <FiBriefcase />
    },
    {
      title: "Advisory Board",
      description: "Expert guidance and strategic advice",
      responsibilities: [
        "Subject matter expertise",
        "Industry best practices guidance",
        "Network and partnership development",
        "Impact assessment and evaluation"
      ],
      icon: <FiUsers />
    },
    {
      title: "Audit Committee",
      description: "Financial transparency and accountability",
      responsibilities: [
        "Financial audit oversight",
        "Risk assessment and management",
        "Internal control systems review",
        "Compliance monitoring"
      ],
      icon: <FaBalanceScale />
    }
  ];

  const fundAllocation = [
    { category: "Program Implementation", percentage: 75, color: "bg-[#667A62]" },
    { category: "Administrative Costs", percentage: 15, color: "bg-[#4A5C46]" },
    { category: "Fundraising & Communications", percentage: 5, color: "bg-[#2C3E2B]" },
    { category: "Reserve & Contingency", percentage: 5, color: "bg-[#8A9C86]" }
  ];

  const complianceHighlights = [
    {
      title: "Legal Compliance",
      items: [
        "Section 8 Company registration under Companies Act",
        "FCRA registration for foreign contributions",
        "CSR-1 registration with Ministry of Corporate Affairs",
        "12A & 80G tax exemptions",
        "GST & TAN registrations"
      ]
    },
    {
      title: "Financial Transparency",
      items: [
        "Annual statutory audits by independent CA firms",
        "Quarterly financial reviews by audit committee",
        "Public disclosure of annual reports",
        "Donor reporting and impact assessment",
        "Zero tolerance for financial irregularities"
      ]
    },
    {
      title: "Operational Governance",
      items: [
        "Standard operating procedures for all programs",
        "Regular staff and volunteer training",
        "Child protection and safety policies",
        "Anti-harassment and whistleblower policy",
        "Environmental and social safeguards"
      ]
    }
  ];

  const handlePreview = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

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

        .card-hover {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          border: 1px solid #EAF6E3;
        }
        
        .card-hover:hover {
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
        
        .governance-card {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          background: white;
          border: 1px solid #EAF6E3;
        }
        
        .governance-card:hover {
          transform: translateY(-6px);
          background: #2C3E2B;
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.15);
        }
        
        .governance-card:hover .governance-icon svg {
          color: white;
        }
        
        .governance-card:hover .governance-title {
          color: white;
        }
        
        .governance-card:hover .governance-desc {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .governance-card:hover .governance-list li {
          color: rgba(255, 255, 255, 0.85);
        }
        
        .governance-card:hover .governance-list svg {
          color: white;
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
        
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(102, 122, 98, 0.5);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          animation: scaleUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Compliance Governance Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              BUILT ON TRUST. BACKED BY TRANSPARENCY.
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Compliance & Governance
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            MSRS Foundation strictly adheres to all statutory and regulatory compliances as mandated by the Government of India, 
            ensuring transparency and accountability in all operations.
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --- GOVERNANCE STRUCTURE SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              OUR FRAMEWORK
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Governance Structure
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              A robust governance framework ensuring accountability, transparency, and ethical operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governanceStructure.map((item, index) => (
              <div 
                key={index}
                className="governance-card p-5"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="governance-icon text-3xl text-[#667A62] mb-3 flex justify-center transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="governance-title font-serif font-bold text-[#2C3E2B] text-base mb-2 text-center transition-colors duration-300">{item.title}</h3>
                <p className="governance-desc text-xs text-gray-500 mb-3 text-center transition-colors duration-300">{item.description}</p>
                <ul className="governance-list space-y-2">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 transition-colors duration-300">
                      <FiCheckCircle className="text-[#667A62] text-xs mt-0.5 flex-shrink-0 transition-colors duration-300" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK SECTION --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
                OUR PROCESS
              </span>
              <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mb-4">
                How We Work
              </h2>
              <p className="text-[#4A5C46] text-sm leading-relaxed mb-6">
                Our foundation operates with complete transparency and accountability. Every decision, 
                every rupee spent, and every project implemented follows a rigorous process.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#667A62] font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E2B] text-sm">Needs Assessment & Planning</h4>
                    <p className="text-xs text-gray-500">Identify community needs through surveys and stakeholder consultations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#667A62] font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E2B] text-sm">Board Approval & Budget Allocation</h4>
                    <p className="text-xs text-gray-500">Present proposals to board for approval and allocate resources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#667A62] font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E2B] text-sm">Project Implementation & Monitoring</h4>
                    <p className="text-xs text-gray-500">Execute projects with regular monitoring and course correction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#667A62] font-bold text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E2B] text-sm">Impact Assessment & Reporting</h4>
                    <p className="text-xs text-gray-500">Measure outcomes and share reports with stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="stagger-border">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80"
                  alt="How We Work"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FUND ALLOCATION SECTION - Percentage Only --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              FINANCIAL TRANSPARENCY
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              How Your Donations Are Used
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Every rupee is accounted for and directed towards maximum social impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="bg-white p-6 border border-[#EAF6E3]">
                <h3 className="font-serif text-xl font-bold text-[#2C3E2B] mb-5 flex items-center gap-2">
                  <FiPieChart className="text-[#667A62]" /> Fund Allocation (2023-24)
                </h3>
                <div className="space-y-4">
                  {fundAllocation.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-semibold text-[#2C3E2B]">{item.category}</span>
                        <span className="text-[#667A62] font-semibold">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 overflow-hidden">
                        <div 
                          className={`h-full ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[#F7F9F5] border border-[#EAF6E3]">
                  <div className="flex items-center gap-2 mb-2">
                    <FiHeart className="text-[#667A62] text-base" />
                    <span className="text-sm font-semibold text-[#2C3E2B]">Our Commitment</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    75% of funds go directly to programs, ensuring maximum impact. We maintain 
                    minimal administrative costs through efficient operations and volunteer support.
                  </p>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left">
              <div className="bg-white p-6 border border-[#EAF6E3]">
                <h3 className="font-serif text-xl font-bold text-[#2C3E2B] mb-5 flex items-center gap-2">
                  <FiBarChart2 className="text-[#667A62]" /> Impact Metrics (2023-24)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#F7F9F5] border border-[#EAF6E3]">
                    <div className="text-2xl font-bold text-[#667A62]">10,000+</div>
                    <div className="text-xs text-gray-500 mt-1">Lives Impacted</div>
                  </div>
                  <div className="text-center p-4 bg-[#F7F9F5] border border-[#EAF6E3]">
                    <div className="text-2xl font-bold text-[#667A62]">50+</div>
                    <div className="text-xs text-gray-500 mt-1">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-[#F7F9F5] border border-[#EAF6E3]">
                    <div className="text-2xl font-bold text-[#667A62]">25+</div>
                    <div className="text-xs text-gray-500 mt-1">Partner Organizations</div>
                  </div>
                  <div className="text-center p-4 bg-[#F7F9F5] border border-[#EAF6E3]">
                    <div className="text-2xl font-bold text-[#667A62]">500+</div>
                    <div className="text-xs text-gray-500 mt-1">Active Volunteers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPLIANCE HIGHLIGHTS SECTION --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              OUR STANDARDS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Compliance Highlights
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              We maintain the highest standards of legal and regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {complianceHighlights.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-5 border border-[#EAF6E3] card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="font-serif font-bold text-[#2C3E2B] text-base mb-3 flex items-center gap-2">
                  <FiShield className="text-[#667A62]" size={14} /> {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((listItem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <FiCheckCircle className="text-[#667A62] text-xs mt-0.5 flex-shrink-0" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CERTIFICATES PREVIEW SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              KEY DOCUMENTS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Our Certificates
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Click on any certificate to preview the document
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesData.map((cert, index) => (
              <div 
                key={index}
                className="bg-white p-4 border border-[#EAF6E3] card-hover cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => handlePreview(cert)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">
                    <FaRegFilePdf className="text-[#667A62] text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2C3E2B] text-sm">{cert.title}</h4>
                    <p className="text-[10px] text-gray-500">{cert.description}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[8px] text-gray-400">📅 {cert.date}</span>
                      <span className="text-[8px] text-gray-400">📄 {cert.size}</span>
                      <span className="text-[8px] text-[#667A62]">{cert.category}</span>
                    </div>
                  </div>
                  <FiEye className="text-[#667A62] text-sm" />
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
                Need More Information?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                For any queries regarding our compliance or governance framework, please contact our compliance officer.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Link 
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Contact Compliance Officer 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CERTIFICATE PREVIEW MODAL --- */}
      {showModal && selectedCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content bg-white max-w-md w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#2C3E2B] p-4 text-white relative">
              <div className="flex items-center gap-2">
                <FaRegFilePdf className="text-lg" />
                <div>
                  <h3 className="font-serif text-sm font-bold">{selectedCert.title}</h3>
                  <p className="text-[9px] text-white/70">{selectedCert.description}</p>
                </div>
              </div>
              <button onClick={closeModal} className="absolute top-3 right-3 w-6 h-6 bg-white/10 flex items-center justify-center hover:bg-white/20 transition rounded">
                <FiX size={12} />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Document Type:</span>
                  <span className="text-[#2C3E2B] font-semibold text-[10px]">{selectedCert.category}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Date of Issue:</span>
                  <span className="text-[#2C3E2B] font-semibold text-[10px]">{selectedCert.date}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">File Size:</span>
                  <span className="text-[#2C3E2B] font-semibold text-[10px]">{selectedCert.size}</span>
                </div>
              </div>
              <div className="bg-[#F7F9F5] p-3 mb-4 border border-[#EAF6E3]">
                <img 
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full h-auto mb-2 rounded"
                />
                <p className="text-[8px] text-[#4A5C46] text-center">
                  This is an official document issued by the competent authority.
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="w-full py-2 bg-[#667A62] text-white text-xs font-semibold hover:bg-[#4A5C46] transition rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceGovernance;