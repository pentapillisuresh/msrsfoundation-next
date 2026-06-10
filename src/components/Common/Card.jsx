import React from 'react';

const Card = ({ title, description, icon, delay = 0 }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-white rounded-xl p-6 shadow-lg card-hover group"
    >
      <div className="text-5xl text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-dark mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;