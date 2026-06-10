import React from "react";

const goals = [
  {
    id: 1,
    title: "No Poverty",
    image: "./images/icon1.svg",
  },
  {
    id: 2,
    title: "Quality Education",
    image: "./images/icon2.svg",
  },
  {
    id: 3,
    title: "Clean Water and Save life",
    image: "./images/icon3.svg",
  },
  {
    id: 4,
    title: "Good Health and Care",
    image: "./images/icon4.svg",
  },
  {
    id: 5,
    title: "Partnerships For the Goals",
    image: "./images/icon5.svg",
  },
  {
    id: 6,
    title: "Zero Hunger",
    image: "./images/icon6.svg",
  },
];

const SustainableGoals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Centered like About and What We Do */}
        <div className="mb-12 text-center">
          <span className="text-xs tracking-[5px] text-secondary font-semibold mb-3 inline-block">
            SUSTAINABLE GOALS
          </span>
          
          <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm">
            Driving Sustainable Impact Aligned with Global Development Goals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
  {[...goals]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((goal) => (
      <div
        key={goal.id}
        className="
          group
          bg-[#EAF3E6]
          w-[150px]
          h-[150px]
          rounded-full
          flex flex-col items-center justify-center
          text-center
          cursor-pointer
          transition-all duration-300
          hover:bg-[#5C6F5C]
        "
      >
        {/* Image */}
        <div className="flex justify-center mb-2">
          <img
            src={goal.image}
            alt={goal.title}
            className="w-10 h-10 object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
          />
        </div>

        {/* Title */}
        <p className="text-xs font-medium text-[#5C6F5C] group-hover:text-white transition px-2">
          {goal.title}
        </p>
      </div>
    ))}
</div>
      </div>
    </section>
  );
};

export default SustainableGoals;