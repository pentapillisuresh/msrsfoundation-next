"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TermsConditions = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#5C6F5C] mb-4">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm">Maha Shree Rudra Samsthanam Foundation (MSRS Foundation)</p>
          <p className="text-gray-400 text-xs mt-2">Effective Date: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="space-y-8" data-aos="fade-up" data-aos-delay="100">
          
          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">1. About the Organization</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              MSRS Foundation is a non-profit, spiritual and charitable organization committed to social welfare, 
              education, spiritual upliftment, and community development initiatives.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">2. Use of Website</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>The content provided on this website is for general informational purposes only.</li>
              <li>You agree to use the website only for lawful purposes and in a manner that does not harm the organization or any individual.</li>
              <li>Unauthorized use, including hacking, data scraping, or misuse of content, is strictly prohibited.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">3. Donations & Payments</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>All donations made to MSRS Foundation are voluntary.</li>
              <li>Donations once made are <strong>non-refundable</strong>, unless there is a technical error.</li>
              <li>Donors are responsible for ensuring accurate details while making contributions.</li>
              <li>The Foundation reserves the right to use donations for any of its charitable objectives.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">4. Intellectual Property Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All content on this website (text, images, logos, designs) is the property of MSRS Foundation unless stated otherwise. 
              You may not copy, reproduce, distribute, or modify any content without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">5. Volunteer & Internship Participation</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>Individuals applying as volunteers or interns must provide accurate information.</li>
              <li>MSRS Foundation reserves the right to accept or reject applications without providing a reason.</li>
              <li>Participation is voluntary and does not guarantee employment.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">6. Privacy Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Personal information collected through this website will be used only for organizational purposes. 
              We do not sell or share personal data with third parties without consent, except as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">7. Third-Party Links</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This website may contain links to third-party websites. MSRS Foundation is not responsible for the content, 
              accuracy, or practices of such websites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">8. Limitation of Liability</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 ml-4">
              <li>MSRS Foundation shall not be liable for any direct, indirect, or incidental damages arising from the use of this website.</li>
              <li>We do not guarantee that the website will be error-free or uninterrupted.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">9. Changes to Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              MSRS Foundation reserves the right to modify these Terms & Conditions at any time without prior notice. 
              Continued use of the website after changes implies acceptance of updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">10. Governing Law</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              These Terms & Conditions shall be governed by the laws of <strong>India</strong>. 
              Any disputes shall be subject to the jurisdiction of the courts in Hyderabad, Telangana.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#5C6F5C] mb-3">11. Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              For any queries regarding these Terms & Conditions, please contact:<br/>
              <strong>Email:</strong> info@msrsfoundation.org<br/>
              <strong>Phone:</strong> +91 XXXXX XXXXX<br/>
              <strong>Address:</strong> Hyderabad, Telangana, India
            </p>
          </div>

          <div className="bg-[#EAF3E6] p-6 rounded-2xl mt-8">
            <p className="text-[#5C6F5C] text-sm font-semibold text-center">
              By using this website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;