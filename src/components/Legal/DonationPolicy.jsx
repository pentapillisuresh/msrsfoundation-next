"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DonationPolicy = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#5C6F5C] mb-4">Donation Policy</h1>
          <p className="text-gray-500 text-sm">Maha Shree Rudra Samsthanam Foundation (MSRS Foundation)</p>
          <p className="text-gray-400 text-xs mt-2">Effective Date: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="space-y-8" data-aos="fade-up" data-aos-delay="100">
          
          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">1. Purpose of Donations</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              All donations support MSRS Foundation initiatives including:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1 ml-4">
              <li>Education programs</li>
              <li>Food distribution (Annadanam)</li>
              <li>Healthcare & medical aid</li>
              <li>Spiritual and community development activities</li>
              <li>Environmental protection</li>
              <li>Disaster relief & emergency support</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">2. Utilization of Funds</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Funds will be utilized at the discretion of the Foundation to maximize social impact, 
              with priority given to the cause selected by the donor where applicable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">3. Transparency</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are committed to maintaining transparency in financial usage and donor communication. 
              Donors can request utilization reports for their contributions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">4. Tax Benefits</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Donations may be eligible for tax exemptions under applicable Indian laws. 
              MSRS Foundation is registered under 12A and 80G for tax benefits.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">5. Donor Responsibility</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Donors must ensure correct details while making donations. 
              Donation receipts will be sent to the provided email address.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">6. Communication</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Donors may receive updates about activities, events, and impact reports, 
              unless they opt out by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">7. Contact for Donation Queries</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Email:</strong> info@msrsfoundation.org<br/>
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>
          </div>

          <div className="bg-[#EAF3E6] p-6 rounded-2xl mt-8">
            <p className="text-[#5C6F5C] text-sm font-semibold text-center">
              Every contribution, big or small, creates a ripple of positive change. Thank you for your support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPolicy;