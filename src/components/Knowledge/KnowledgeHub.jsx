"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiDownload,
  FiEye,
  FiArrowRight,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";

import {
  FaFilePdf,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import ApiService from "@/services/ApiService";

const KnowledgeHub = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: "ease-out-back",
    });
  }, []);

  // STATES
  const [categories, setCategories] = useState([]);
  const [libraryData, setLibraryData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH API
  useEffect(() => {
    fetchKnowledgeHub();
  }, []);

  const fetchKnowledgeHub = async () => {
    try {
      setLoading(true);

      // Categories
      const categoryRes = await ApiService.get(
        "/categories?categoryRelated=knowledge"
      );

      // E-Library
      const libraryRes = await ApiService.get(
        "/e-library"
      );

      console.log("Categories:", categoryRes);
      console.log("Library:", libraryRes);

      setCategories(categoryRes.data || []);
      setLibraryData(libraryRes.data?.data || []);

    } catch (error) {
      console.log("Knowledge Hub Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // DEFAULT ACTIVE TAB
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories]);

  // DYNAMIC TABS
  const tabs = categories.map((cat) => ({
    id: cat.id,
    label: cat.name,
    count: libraryData.filter(
      (item) => item.categoryId === cat.id
    ).length,
  }));

  // FILTER DATA
  const currentData = libraryData.filter(
    (item) => item.categoryId === activeTab
  );

  const filteredData = currentData.filter(
    (item) =>
      item.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');

        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .knowledge-card {
          transition: all 0.4s ease;
          border: 1px solid #EAF6E3;
        }

        .knowledge-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
        }

        .tab-button {
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: #667A62;
          color: white;
        }

        .tab-button:hover:not(.active) {
          background: #EAF6E3;
        }

        .search-input {
          border: 1px solid #ddd;
        }

        .search-input:focus {
          outline: none;
          border-color: #667A62;
          box-shadow: 0 0 0 3px rgba(102,122,98,0.1);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

      `}</style>

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Knowledge Hub"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">

          <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full">
            KNOWLEDGE HUB
          </span>

          <h1 className="text-white text-4xl md:text-5xl mb-4 font-serif">
            Insights & Resources
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto">
            Explore reports, research papers, case studies and downloadable resources.
          </p>

        </div>
      </section>

      {/* MAIN */}
      <section className="py-24 bg-[#F7F9F5]">

        <div className="container mx-auto px-6 max-w-7xl">

          {/* HEADER */}
          <div className="text-center mb-12">

            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              RESOURCE LIBRARY
            </span>

            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Explore Our Resources
            </h2>

            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Access reports, research papers and knowledge documents.
            </p>

          </div>

          {/* SEARCH */}
          <div className="max-w-md mx-auto mb-10">

            <div className="relative">

              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#667A62]" />

              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input w-full pl-10 pr-4 py-3 bg-white text-sm"
              />

            </div>

          </div>

          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === tab.id
                    ? "active bg-[#667A62] text-white"
                    : "bg-white text-[#4A5C46]"
                }`}
              >

                {tab.label}

                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-[#EAF6E3] text-[#667A62]"
                  }`}
                >
                  {tab.count}
                </span>

              </button>

            ))}

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="text-center py-20 text-[#667A62]">
              Loading...
            </div>

          ) : filteredData.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredData.map((item, index) => (

                <div
                  key={index}
                  className="knowledge-card bg-white p-5"
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-3">

                    <div className="w-10 h-10 bg-[#EAF6E3] flex items-center justify-center">
                      <FaFilePdf className="text-[#667A62] text-xl" />
                    </div>

                    <span className="text-[9px] font-semibold text-[#667A62] bg-[#EAF6E3] px-2 py-0.5 uppercase tracking-wider">
                      {item.Category?.name || "Knowledge"}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3 className="font-serif font-bold text-[#2C3E2B] text-lg mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[#4A5C46] text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* DETAILS */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-4">

                    <div className="flex items-center gap-1">
                      <FiCalendar size={10} />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiFileText size={10} />
                      <span>PDF</span>
                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center pt-3 border-t border-[#EAF6E3]">

                    <button
                      onClick={() =>
                        window.open(
                          `http://localhost:3000${item.file}`,
                          "_blank"
                        )
                      }
                      className="flex items-center gap-1 text-[#667A62] font-semibold text-xs"
                    >
                      <FiEye size={12} />
                      Preview
                    </button>

                    <a
                      href={`http://localhost:3000${item.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[#667A62] font-semibold text-xs"
                    >
                      <FiDownload size={12} />
                      Download
                    </a>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <div className="text-5xl mb-4">
                📚
              </div>

              <h3 className="font-serif text-2xl text-[#2C3E2B] mb-2">
                No Resources Found
              </h3>

              <p className="text-[#4A5C46]">
                Try another search or category.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* CTA */}
      <section className="py-20">

        <div className="container mx-auto px-6">

          <div className="bg-[#6F8770] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="text-center lg:text-left">

              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-white/80 text-sm md:text-base">
                Get latest resources and reports delivered to your inbox.
              </p>

            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">

              <button className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md">
                Subscribe Now
                <FiArrowRight size={14} />
              </button>

              <Link
                href="/contact"
                className="px-5 py-2.5 border border-white text-white font-semibold text-sm rounded-md hover:bg-white hover:text-[#2C3E2B] transition-all duration-300"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default KnowledgeHub;