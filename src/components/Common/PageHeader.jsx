import React from 'react';

const PageHeader = ({ title, subtitle, description }) => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-primary to-secondary/10">
      <div className="container-custom text-center">
        <div data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-secondary font-semibold mb-4">{subtitle}</p>
          <p className="text-gray-700 max-w-3xl mx-auto">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;