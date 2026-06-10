
"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RefundPolicy = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#5C6F5C] mb-4">Refund Policy</h1>
          <p className="text-gray-500 text-sm">Maha Shree Rudra Samsthanam Foundation (MSRS Foundation)</p>
          <p className="text-gray-400 text-xs mt-2">Effective Date: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="space-y-8" data-aos="fade-up" data-aos-delay="100">
          
          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">1. Donations</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>All donations are voluntary and made towards charitable causes.</li>
              <li>Donations are <strong>non-refundable</strong> under normal circumstances.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">2. Exceptions</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">Refunds may be considered only if:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1 ml-4">
              <li>There is a duplicate transaction</li>
              <li>There is a technical/payment error</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">3. Refund Request Process</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>Request must be raised within <strong>7 days</strong> of the transaction</li>
              <li>Provide transaction ID, date, and donor details</li>
              <li>Send request to: <strong>info@msrsfoundation.org</strong></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">4. Processing Time</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Approved refunds will be processed within <strong>7–10 working days</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">5. Contact for Refund Queries</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Email:</strong> info@msrsfoundation.org<br/>
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>
          </div>

          <div className="bg-[#EAF3E6] p-6 rounded-2xl mt-8">
            <p className="text-[#5C6F5C] text-sm font-semibold text-center">
              We value your trust and ensure complete transparency in all financial transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;