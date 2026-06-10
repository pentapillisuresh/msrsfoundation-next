"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
        
        {/* Header */}
        <div 
          data-aos="fade-up"
          className="mb-12 text-center"
        >
          <span className="text-xs tracking-[5px] text-[#5C6F5C] font-semibold mb-3 inline-block uppercase">
            Legal
          </span>
          <div className="w-16 h-0.5 bg-[#5C6F5C] mx-auto mb-6"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#5C6F5C] mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Maha Shree Rudra Samsthanam Foundation (MSRS Foundation)</p>
          <p className="text-gray-400 text-xs mt-2">Effective Date: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="space-y-8" data-aos="fade-up" data-aos-delay="100">
          
          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">1. Introduction</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maha Shree Rudra Samsthanam Foundation (MSRS Foundation) respects your privacy and is committed 
              to protecting your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">We may collect:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1 ml-4">
              <li>Name, email address, phone number</li>
              <li>Donation details and transaction information</li>
              <li>Volunteer or internship application data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">3. How We Use Information</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1 ml-4">
              <li>To process donations and issue receipts</li>
              <li>To communicate updates, events, and initiatives</li>
              <li>To improve our services and outreach</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">4. Data Protection</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We implement appropriate security measures to protect your data from unauthorized access or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">5. Sharing of Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We do not sell or share your data with third parties, except:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1 ml-4 mt-2">
              <li>When required by law</li>
              <li>For payment processing (secure gateways)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">6. Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our website may use cookies to enhance user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">7. Your Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              You may request to access, update, or delete your personal data by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">8. Changes to Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">9. Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Email:</strong> info@msrsfoundation.org<br/>
              <strong>Phone:</strong> +91 XXXXX XXXXX<br/>
              <strong>Address:</strong> Hyderabad, Telangana, India
            </p>
          </div>

          <div className="bg-[#EAF3E6] p-6 rounded-2xl mt-8">
            <p className="text-[#5C6F5C] text-sm font-semibold text-center">
              Your privacy matters to us. We are committed to transparency and protecting your personal information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;