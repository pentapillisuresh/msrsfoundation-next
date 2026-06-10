"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";

import AOS from "aos";
import "aos/dist/aos.css";

import ApiService from "@/services/ApiService";

const CSRProjects = () => {

  const BACKEND_URL =
    "http://localhost:3000";

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [categories, setCategories] =
    useState([]);

  const [projectsData, setProjectsData] =
    useState([]);

  useEffect(() => {

    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: "ease-out-back",
    });

    fetchCategories();

    fetchProjects();

  }, []);

  // FETCH CATEGORIES
  const fetchCategories = async () => {

    try {

      const response =
        await ApiService.get(
          "/categories?categoryRelated=project"
        );

      const categoriesArray =
        response?.data || [];

      const finalCategories = [
        "All",
        ...categoriesArray.map(
          (item) => item.name
        ),
      ];

      setCategories(finalCategories);

    } catch (error) {

      console.log(
        "Category Fetch Error",
        error
      );
    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const response =
        await ApiService.get(
          "/projects"
        );

      const projectArray =
        response?.data?.data || [];

      const formattedProjects =
        projectArray.map((project) => ({

          id: project.id,

          title: project.name,

          objective:
            project.objective,

          beneficiaries:
            project.targetBeneficiaries,

          impactMetrics:
            Array.isArray(project.points)
              ? project.points.join(" • ")
              : "",

          csrAlignment:
            project.csrAlignment,

          category:
            project.Category?.name ||
            "General",

          image:
            project.projectImage
              ? `${BACKEND_URL}${project.projectImage}`
              : "/images/default.jpg",

          budget:
            project.budgetRequired,

          state:
            project.state,

          district:
            project.district,

          status:
            project.status,

          icon: <FiTarget />,

        }));

      setProjectsData(
        formattedProjects
      );

    } catch (error) {

      console.log(
        "Project Fetch Error",
        error
      );
    }
  };

  // FILTER PROJECTS
  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter(
          (project) =>
            project.category ===
            activeCategory
        );

  return (

    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">

      <style jsx global>{`

        .project-card {
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
          background: white;
          height: 320px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.15);
        }

        .image-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: hidden;
          transform: translateY(100%);
          transition: transform 0.6s ease;
          z-index: 1;
        }

        .project-card:hover .image-container {
          transform: translateY(0);
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .card-content {
          position: relative;
          z-index: 2;
          background: white;
          height: 100%;
          padding: 16px;
          transition: transform 0.6s ease;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover .card-content {
          transform: translateY(-100%);
        }

        .category-tab {
          transition: all 0.3s ease;
        }

        .category-tab.active {
          background: #667A62;
          color: white;
          border-color: #667A62;
        }

      `}</style>

      {/* HERO */}

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">

          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
            className="w-full h-full object-cover"
            alt="CSR Hero"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />

        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">

          <h1 className="text-white text-3xl md:text-5xl font-serif mb-4">

            Strategic CSR Initiatives

          </h1>

          <p className="text-white/80 max-w-2xl mx-auto">

            Delivering measurable impact through transparent and sustainable development programs.

          </p>

        </div>

      </section>

      {/* PROJECT SECTION */}

      <section className="py-20 bg-[#F7F9F5]">

        <div className="container mx-auto px-6 max-w-7xl">

          {/* TITLE */}

          <div
            className="text-center mb-12"
            data-aos="fade-up"
          >

            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">

              OUR INITIATIVES

            </span>

            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">

              Flagship CSR Projects

            </h2>

          </div>

          {/* CATEGORY TABS */}

          <div
            className="flex flex-wrap justify-center gap-3 mb-12"
            data-aos="fade-up"
          >

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`category-tab px-5 py-2 rounded-full text-xs font-semibold border uppercase tracking-wider ${
                  activeCategory === category
                    ? "active bg-[#667A62] text-white border-[#667A62]"
                    : "bg-white text-[#4A5C46] border-gray-200"
                }`}
              >

                {category}

              </button>

            ))}

          </div>

          {/* PROJECT GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProjects.map(
              (project, index) => (

                <div
                  key={project.id}
                  className="project-card"
                  data-aos="fade-up"
                  data-aos-delay={
                    (index % 4) * 100
                  }
                >

                  {/* IMAGE */}

                  <div className="image-container">

                    <img
                      src={project.image}
                      alt={project.title}
                    />

                    <div className="image-overlay"></div>

                  </div>

                  {/* CONTENT */}

                  <div className="card-content">

                    <div className="mb-2">

                      <span className="inline-block px-2 py-1 bg-[#EAF6E3] text-[#667A62] text-[9px] font-bold uppercase tracking-wider">

                        {project.category}

                      </span>

                    </div>

                    <h3 className="font-serif text-base font-bold text-[#2C3E2B] mb-2">

                      {project.title}

                    </h3>

                    <div className="space-y-3 flex-grow">

                      <div>

                        <h4 className="text-[9px] font-bold text-[#667A62] uppercase tracking-wider mb-1">

                          Objective

                        </h4>

                        <p className="text-[#4A5C46] text-[11px] leading-relaxed">

                          {project.objective}

                        </p>

                      </div>

                      <div>

                        <h4 className="text-[9px] font-bold text-[#667A62] uppercase tracking-wider mb-1">

                          Beneficiaries

                        </h4>

                        <p className="text-[#4A5C46] text-[11px]">

                          {project.beneficiaries}

                        </p>

                      </div>

                      <div>

                        <h4 className="text-[9px] font-bold text-[#667A62] uppercase tracking-wider mb-1">

                          Budget

                        </h4>

                        <p className="text-[#4A5C46] text-[11px]">

                          ₹ {project.budget}

                        </p>

                      </div>

                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EAF6E3]">

                      <Link
                        href="/donate"
                        className="inline-flex items-center gap-1 text-[#667A62] font-semibold text-[10px]"
                      >

                        Support This Project

                        <FiArrowRight size={10} />

                      </Link>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

          {/* EMPTY */}

          {filteredProjects.length === 0 && (

            <div className="text-center py-20">

              <p className="text-[#4A5C46]">

                No projects found.

              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default CSRProjects;