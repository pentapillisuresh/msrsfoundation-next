import React from 'react';
import { teamData } from '../../data/teamData';
import { FiUser } from 'react-icons/fi';

const CoreTeam = () => {
  const categories = [
    { title: "Project Heads", key: "projectHeads" },
    { title: "Field Officers", key: "fieldOfficers" },
    { title: "CSR Coordinators", key: "csrCoordinators" }
  ];

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-4" data-aos="fade-up">
          Our Core Team
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto" data-aos="fade-up">
          People Behind the Purpose - Dedicated professionals working tirelessly for social change
        </p>

        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h3 className="text-2xl font-bold text-dark mb-8 text-center" data-aos="fade-up">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData[category.key].map((member, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white rounded-xl overflow-hidden shadow-lg card-hover group">
                  <div className="relative h-64 bg-primary flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                    <FiUser className="text-secondary text-8xl group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-dark mb-1">{member.name}</h4>
                    <p className="text-secondary font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{member.qualification}</p>
                    <p className="text-gray-500 text-sm">{member.specialization}</p>
                    <p className="text-xs text-gray-400 mt-2">{member.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreTeam;