import React, { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import IndividualSupport from './IndividualSupport';
import CorporatePartnership from './CorporatePartnership';
import VolunteerForm from './VolunteerForm';
import Button from '../Common/Button';

const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState('individual');

  const tabs = [
    { id: 'individual', label: 'Individual Support', icon: '👤' },
    { id: 'corporate', label: 'Corporate Partnership', icon: '🏢' },
    { id: 'volunteer', label: 'Volunteer & Internship', icon: '🤝' }
  ];

  return (
    <div className="pt-24">
      <PageHeader 
        title="Get Involved"
        subtitle="Be a Part of the Change."
        description="Join us in making a difference through contributions, partnerships, and active participation in our initiatives."
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-secondary text-white shadow-lg transform scale-105'
                    : 'bg-primary text-dark hover:bg-secondary/20'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div data-aos="fade-up" data-aos-duration="500">
            {activeTab === 'individual' && <IndividualSupport />}
            {activeTab === 'corporate' && <CorporatePartnership />}
            {activeTab === 'volunteer' && <VolunteerForm />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;