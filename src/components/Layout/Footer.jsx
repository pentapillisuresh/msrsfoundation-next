"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiHeart, 
  FiMail, 
  FiPhone, 
  FiArrowRight,
  FiExternalLink,
  FiShield,
  FiCheckCircle,
  FiMapPin
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  // Use your local image
  const upiQrCodeUrl = "/images/qr1.png";

  const handleDonateClick = () => {
    router.push('/donate');
  };

  return (
    <footer className="bg-[#2C3E2B] text-white pt-20 pb-8 relative overflow-hidden font-sans">
      {/* Background Text - MSRS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[15vw] font-black text-white/5 whitespace-nowrap tracking-wider">
          MSRS
        </span>
      </div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/msrs.png" alt="MSRS Logo" className="w-12 h-12 object-contain filter brightness-0 invert" />
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                MSRS<br/>Foundation
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/80 italic">
              "Excellence in Service, Transparency in Governance."
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiFacebook, href: "https://facebook.com" },
                { Icon: FiInstagram, href: "https://instagram.com" },
                { Icon: FiLinkedin, href: "https://linkedin.com" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#2C3E2B] transition-all duration-300"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-7">Navigation</h4>
            <ul className="grid grid-cols-1 gap-3">
              <li>
                <Link href="/" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/csr-projects" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  CSR Projects
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  Events
                </Link>
              </li>
              <li>
                <Link href="/digital-media" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  Digital Media
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="text-sm text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                  <FiArrowRight className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-xs" /> 
                  Knowledge Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Legal */}
          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-7">Governance</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/compliance" className="text-sm text-white/80 hover:text-white transition-all">
                  Compliance & Governance
                </Link>
              </li>
              <li>
                <Link href="/board-management" className="text-sm text-white/80 hover:text-white transition-all">
                  Board Management
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-sm text-white/80 hover:text-white transition-all">
                  Statutory Certificates
                </Link>
              </li>
              <li>
                <Link href="/audit-reports" className="text-sm text-white/80 hover:text-white transition-all">
                  Audit Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-7">Contact</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <FiPhone className="text-white" size={14} /> 
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <FiMail className="text-white" size={14} /> 
                <span>info@msrsfoundation.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <FiMapPin className="text-white" size={14} /> 
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Column 5: QR Code & Donate */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-lg">
              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <img 
                  src={upiQrCodeUrl} 
                  alt="Scan QR Code to Donate" 
                  className="w-40 h-40 object-contain rounded-xl bg-white p-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/160x160/667A62/white?text=QR+Code";
                  }}
                />
              </div>
              
              {/* Scan Text */}
              <p className="text-center text-[10px] text-white/70 font-semibold tracking-wider mb-3">
                SCAN & PAY VIA UPI
              </p>
            </div>
            <div>
              <button 
                onClick={handleDonateClick}
                className="w-full bg-white hover:bg-white/90 text-[#2C3E2B] font-bold py-3 mt-2 px-4 rounded-xl transition-all duration-300 text-sm tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <FiHeart size={16} />
                DONATE NOW
              </button>
              
              {/* 80G Tax Exemption Text */}
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <FiCheckCircle size={10} className="text-white/80" />
                  <p className="text-[8px] text-white/80 font-medium tracking-wide">
                    80G Tax Exemption Available
                  </p>
                </div>
                <p className="text-[7px] text-white/50 mt-1">
                  UPI • NetBanking • Cards
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
            © {currentYear} Maha Shree Rudra Samsthanam Foundation • All Rights Reserved
          </p>
          
          <div className="flex gap-6 text-[10px] font-bold tracking-[0.1em] text-white/60 uppercase">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund</Link>
            <Link href="/donation-policy" className="hover:text-white transition-colors">Donation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;