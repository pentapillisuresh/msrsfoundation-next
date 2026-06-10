"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown, FiChevronRight, FiHeart, FiCalendar, FiUsers, FiBriefcase, FiBookOpen, FiAward, FiShield, FiVideo, FiTrendingUp, FiFileText } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  
  // Mobile dropdown states - initially closed
  const [mobileGetInvolvedOpen, setMobileGetInvolvedOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  
  const dropdownTimeoutRef = useRef(null);
  const exploreTimeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleExploreEnter = () => {
    if (exploreTimeoutRef.current) clearTimeout(exploreTimeoutRef.current);
    setExploreOpen(true);
  };

  const handleExploreLeave = () => {
    exploreTimeoutRef.current = setTimeout(() => {
      setExploreOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      if (exploreTimeoutRef.current) clearTimeout(exploreTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'CSR Projects', path: '/csr-projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleStatutoryCertificatesClick = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('msrs_verified_user');
    if (storedUser) {
      router.push('/certificates');
    } else {
      router.push('/certificates?showVerification=true');
    }
    setExploreOpen(false);
    setIsOpen(false);
  };

  const handleComplianceClick = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('msrs_verified_user');
    if (storedUser) {
      router.push('/compliance');
    } else {
      router.push('/compliance?showVerification=true');
    }
    setExploreOpen(false);
    setIsOpen(false);
  };

  const handleAuditReportsClick = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('msrs_verified_user');
    if (storedUser) {
      router.push('/audit-reports');
    } else {
      router.push('/audit-reports?showVerification=true');
    }
    setExploreOpen(false);
    setIsOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Reset mobile dropdowns when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setMobileGetInvolvedOpen(false);
      setMobileExploreOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        
        .font-heading {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.2s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out forwards;
        }
      `}</style>
      
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-white shadow-xl py-2' 
            : 'bg-transparent py-5'
        }`}
        style={{ height: scrolled ? '70px' : '80px' }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">

            {/* LOGO - Mobile optimized */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
              <div className="relative">
                <img 
                  src="/images/msrs.png" 
                  alt="MSRS Logo"
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-105 ${
                    !scrolled ? 'brightness-0 invert' : ''
                  }`}
                />
              </div>
              <div className="hidden xs:block md:hidden lg:block">
                <p className={`font-heading text-sm sm:text-base font-bold tracking-wide leading-tight transition-colors duration-300 ${
                  !scrolled ? 'text-white' : 'text-gray-800'
                }`}>
                  MAHA SHREE RUDRA
                </p>
                <p className="font-body text-[8px] sm:text-[10px] font-semibold text-secondary tracking-wider">
                  SAMSTHANAM FOUNDATION
                </p>
              </div>
           
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden xl:flex items-center space-x-6 h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative font-body font-semibold text-sm tracking-wide transition-all duration-300 flex items-center h-full ${
                    isActivePath(link.path)
                      ? 'text-secondary' 
                      : !scrolled 
                        ? 'text-white hover:text-secondary' 
                        : 'text-gray-700 hover:text-secondary'
                  }`}
                >
                  {link.name}
                  {isActivePath(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-full"></span>
                  )}
                </Link>
              ))}

              {/* GET INVOLVED DROPDOWN - Desktop */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button className={`flex items-center space-x-1.5 font-body font-semibold text-sm tracking-wide transition-all duration-300 group ${
                  !scrolled ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-secondary'
                }`}>
                  <span>Get Involved</span>
                  <FiChevronDown className={`text-sm transition-all duration-300 ${dropdownOpen ? 'rotate-180 text-secondary' : 'group-hover:text-secondary'}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 overflow-hidden z-50 animate-fadeInUp">
                    <Link 
                      href="/get-involved/individual"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiHeart className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Individual Support</div>
                        <div className="font-body text-xs text-gray-500">Make a personal contribution</div>
                      </div>
                    </Link>
                    <Link 
                      href="/get-involved/corporate"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiBriefcase className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Corporate Partnership</div>
                        <div className="font-body text-xs text-gray-500">Collaborate for CSR initiatives</div>
                      </div>
                    </Link>
                    <Link 
                      href="/get-involved/volunteer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiUsers className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Volunteer & Internship</div>
                        <div className="font-body text-xs text-gray-500">Join our mission</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* EXPLORE DROPDOWN - Desktop */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={handleExploreEnter}
                onMouseLeave={handleExploreLeave}
              >
                <button className={`flex items-center space-x-1.5 font-body font-semibold text-sm tracking-wide transition-all duration-300 group ${
                  !scrolled ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-secondary'
                }`}>
                  <span>Explore</span>
                  <FiChevronDown className={`text-sm transition-all duration-300 ${exploreOpen ? 'rotate-180 text-secondary' : 'group-hover:text-secondary'}`} />
                </button>

                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 overflow-hidden z-50 animate-fadeInUp">
                    <Link 
                      href="/events" 
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setExploreOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiCalendar className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Events & Initiatives</div>
                        <div className="font-body text-xs text-gray-500">Upcoming events and campaigns</div>
                      </div>
                    </Link>
                    <Link 
                      href="/knowledge-hub" 
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setExploreOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiBookOpen className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Knowledge Hub</div>
                        <div className="font-body text-xs text-gray-500">Reports, research & case studies</div>
                      </div>
                    </Link>
                    <Link 
                      href="/board-management" 
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setExploreOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiTrendingUp className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Board & Management</div>
                        <div className="font-body text-xs text-gray-500">Our leadership team</div>
                      </div>
                    </Link>
                    <Link 
                      href="/digital-media" 
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group"
                      onClick={() => setExploreOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiVideo className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Digital Media</div>
                        <div className="font-body text-xs text-gray-500">Videos, photos & social media</div>
                      </div>
                    </Link>
                    <button 
                      onClick={handleStatutoryCertificatesClick}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiAward className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Statutory Certificates</div>
                        <div className="font-body text-xs text-gray-500">Government approvals & registrations</div>
                      </div>
                    </button>
                    <button 
                      onClick={handleComplianceClick}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiShield className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Compliance & Governance</div>
                        <div className="font-body text-xs text-gray-500">Legal & regulatory compliance</div>
                      </div>
                    </button>
                    <button 
                      onClick={handleAuditReportsClick}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/50 transition-all duration-300 group text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-white transition-colors">
                        <FiFileText className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-gray-800 group-hover:text-secondary transition-colors text-sm">Audit & Annual Reports</div>
                        <div className="font-body text-xs text-gray-500">Financial and compliance reports</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* CTA BUTTONS - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link 
                href="/donate"
                className="px-4 py-1.5 rounded-full bg-secondary text-white font-body font-semibold text-xs tracking-wide transition-all duration-300 hover:bg-secondary/90 hover:shadow-md hover:scale-105 active:scale-95"
              >
                DONATE
              </Link>
              <Link 
                href="/schedule-meeting"
                className={`px-4 py-1.5 rounded-full border-2 font-body font-semibold text-xs tracking-wide transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 ${
                  !scrolled 
                    ? 'border-white text-white hover:bg-white hover:text-secondary' 
                    : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                }`}
              >
                MEETING
              </Link>
              <Link 
                href="/get-involved/volunteer"
                className={`px-4 py-1.5 rounded-full font-body font-semibold text-xs tracking-wide transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 ${
                  !scrolled 
                    ? 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30' 
                    : 'bg-secondary text-white hover:bg-primary border border-gray-200'
                }`}
              >
                VOLUNTEER
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className={`xl:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                !scrolled 
                  ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white' 
                  : 'bg-primary hover:bg-primary/80 text-gray-800'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? 
                <FiX className="text-xl" /> : 
                <FiMenu className="text-xl" />
              }
            </button>
          </div>

          {/* MOBILE MENU - With collapsible dropdowns (initially closed) */}
          <div 
            className={`xl:hidden transition-all duration-300 ease-out overflow-hidden ${
              isOpen ? 'max-h-[calc(100vh-80px)] opacity-100 visible mt-4' : 'max-h-0 opacity-0 invisible mt-0'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                
                {/* Main Navigation Links */}
                <div className="p-3 space-y-1 border-b border-gray-100">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl font-body font-semibold transition-all duration-300 ${
                        isActivePath(link.path)
                          ? 'bg-secondary text-white' 
                          : 'text-gray-800 hover:bg-primary/50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* GET INVOLVED - Collapsible Section (initially closed) */}
                <div className="p-3 border-b border-gray-100">
                  <button
                    onClick={() => setMobileGetInvolvedOpen(!mobileGetInvolvedOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <FiHeart className="text-secondary text-xs" />
                      </div>
                      <span className="font-body font-bold text-secondary text-sm">Get Involved</span>
                    </div>
                    <FiChevronRight className={`text-secondary text-sm transition-all duration-300 ${mobileGetInvolvedOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {/* Submenu - only visible when clicked */}
                  {mobileGetInvolvedOpen && (
                    <div className="mt-2 ml-6 space-y-1 animate-slideDown">
                      <Link 
                        href="/get-involved/individual"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiHeart className="text-secondary text-sm w-5" /> 
                        <span>Individual Support</span>
                      </Link>
                      <Link 
                        href="/get-involved/corporate"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiBriefcase className="text-secondary text-sm w-5" /> 
                        <span>Corporate Partnership</span>
                      </Link>
                      <Link 
                        href="/get-involved/volunteer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiUsers className="text-secondary text-sm w-5" /> 
                        <span>Volunteer & Internship</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* EXPLORE - Collapsible Section (initially closed) */}
                <div className="p-3 border-b border-gray-100">
                  <button
                    onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <FiBookOpen className="text-secondary text-xs" />
                      </div>
                      <span className="font-body font-bold text-secondary text-sm">Explore</span>
                    </div>
                    <FiChevronRight className={`text-secondary text-sm transition-all duration-300 ${mobileExploreOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {/* Submenu - only visible when clicked */}
                  {mobileExploreOpen && (
                    <div className="mt-2 ml-6 space-y-1 animate-slideDown">
                      <Link 
                        href="/events" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiCalendar className="text-secondary text-sm w-5" /> 
                        <span>Events & Initiatives</span>
                      </Link>
                      <Link 
                        href="/knowledge-hub" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiBookOpen className="text-secondary text-sm w-5" /> 
                        <span>Knowledge Hub</span>
                      </Link>
                      <Link 
                        href="/board-management" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiTrendingUp className="text-secondary text-sm w-5" /> 
                        <span>Board & Management</span>
                      </Link>
                      <Link 
                        href="/digital-media" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm"
                      >
                        <FiVideo className="text-secondary text-sm w-5" /> 
                        <span>Digital Media</span>
                      </Link>
                      <button 
                        onClick={handleStatutoryCertificatesClick}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm text-left"
                      >
                        <FiAward className="text-secondary text-sm w-5" /> 
                        <span>Statutory Certificates</span>
                      </button>
                      <button 
                        onClick={handleComplianceClick}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm text-left"
                      >
                        <FiShield className="text-secondary text-sm w-5" /> 
                        <span>Compliance & Governance</span>
                      </button>
                      <button 
                        onClick={handleAuditReportsClick}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-primary/50 transition-all duration-300 font-body text-sm text-left"
                      >
                        <FiFileText className="text-secondary text-sm w-5" /> 
                        <span>Audit & Annual Reports</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* ACTION BUTTONS - Mobile */}
                <div className="p-4 space-y-3 bg-gray-50">
                  <Link 
                    href="/donate" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 rounded-full bg-secondary text-white font-body font-semibold text-sm transition-all duration-300 hover:bg-secondary/90 shadow-md"
                  >
                    DONATE NOW
                  </Link>
                  <Link 
                    href="/schedule-meeting" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 rounded-full border-2 border-secondary text-secondary font-body font-semibold text-sm transition-all duration-300 hover:bg-secondary hover:text-white"
                  >
                    SCHEDULE MEETING
                  </Link>
                  <Link 
                    href="/get-involved/volunteer" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 rounded-full bg-primary text-gray-800 font-body font-semibold text-sm transition-all duration-300 hover:bg-primary/80 border border-gray-200"
                  >
                    VOLUNTEER REGISTER
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global styles for custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1a57b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8895e;
        }
        
        /* Extra small screen breakpoint (xs) */
        @media (min-width: 480px) {
          .xs\\:block {
            display: block;
          }
          .xs\\:hidden {
            display: none;
          }
        }
        @media (max-width: 479px) {
          .xs\\:block {
            display: none;
          }
          .xs\\:hidden {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Header;