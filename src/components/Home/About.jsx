"use client";

import React from "react";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();

  const handleMoreDetails = () => {
    router.push("/about");
  };

  return (
    <section className="py-10 bg-[#f5f5f5]">
      {/* Full width container */}
      <div className="w-full px-0">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[5px] text-secondary font-semibold mb-3 inline-block">
            ABOUT
          </span>

          <div className="w-16 h-0.5 bg-secondary mx-auto"></div>

          <p
            className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm"
            style={{ fontFamily: "'Mulish', sans-serif" }}
          >
            Empowering Communities Through Sustainable Development
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          {/* LEFT VIDEO */}
          <div className="overflow-hidden shadow-xl h-full">
            <video
              src="/images/msrs.mp4"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="px-8 md:px-12 lg:px-16 py-12">
            {/* Since + Line */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-500 text-lg">
                Since 2025
              </span>

              <div className="w-20 h-[1px] bg-[#5C6F5C]"></div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              MAHA SHREE RUDRA SAMSTHANAM FOUNDATION
              (MSRS Foundation) is a Section 8 non-profit
              organization, established with a vision to
              create sustainable and inclusive development
              across diverse communities.

              Registered under the Ministry of Corporate
              Affairs, Government of India, the foundation
              operates with a strong focus on accountability,
              transparency, and measurable social impact.

              The organization works across multiple sectors,
              aligning its initiatives with national
              development goals and global sustainability
              frameworks.
            </p>

            <div className="text-left">
              <button
                onClick={handleMoreDetails}
                className="relative group/btn inline-flex items-center justify-center overflow-hidden border-2 border-[#5C6F5C] text-[#5C6F5C] px-10 py-4 font-medium tracking-wider transition-all duration-500 hover:text-white rounded-full"
              >
                {/* Text + Arrow */}
                <span className="relative z-10 flex items-center space-x-3 group-hover/btn:text-white transition-colors duration-500">
                  <span>More Details</span>

                  <svg
                    className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                {/* Animated Strips */}
                <span className="absolute top-0 left-0 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>

                <span className="absolute top-0 left-1/2 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>

                <span className="absolute bottom-0 left-1/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>

                <span className="absolute bottom-0 left-3/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;